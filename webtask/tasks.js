'use strict';

const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = new express();
app.use(bodyParser.json());

app.get('/', getTaks);
app.post('/', addTask);
app.delete('/', deleteTask);


module.exports = app;


function getTaks(req, res){

  let userCollection = loadUserCollection(req.webtaskContext);

  userCollection
         .find()
         .sort({ createdAt: -1 }, (error, data) => {
            res.status(error ? 500: 200)
                 .send(error || data);
         });
}

function addTask(req, res) {
    let userCollection = loadUserCollection(req.webtaskContext);

    userCollection.save({
       createdAt: new Date(),
       description: req.body.description
    }, () => res.end());
}

function deleteTask(req, res) {

   let userCollection = loadUserCollection(req.webtaskContext);

   userCollection
       .remove(
           { _id: mongojs.ObjectId(req.query.id)},
           () => res.end()
   );
}

function loadUserCollection(webtaskContext){

  const AUTH0_SECRET = webtaskContext.secrets.AUTH0_SECRET;
  const MONGO_USER = webtaskContext.secrets.MONGO_USER;
  const MONGO_PASSWORD = webtaskContext.secrets.MONGO_PASSWORD;
  const MONGO_URL = webtaskContext.secrets.MONGO_URL;

  let authorizationHeader = webtaskContext.headers.authorization;
  authorizationHeader = authorizationHeader.replace('Bearer ', '');

  let token = jwt.verify(
       authorizationHeader,
        AUTH0_SECRET
    );
  let mongodb = mongojs(`${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`);

  return mongodb.collection(token.sub);
}
