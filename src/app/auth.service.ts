import { Injectable } from '@angular/core';
import  Auth0Lock  from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

const AUTH0_CLIENT_ID = 'z6LP9XkiYJWJz90MmHRDveLFY02Y764q';
const AUTH0_DOMAIN = 'dwx.auth0.com';

const ID_TOKEN = 'id_token';



@Injectable()
export class AuthService {

  lock = new Auth0Lock(
              AUTH0_CLIENT_ID,
              AUTH0_DOMAIN,
              {}
            );


  constructor() {

     this.lock.on(
         'authenticated',
         (authenticationResponse) => {
            localStorage
              .setItem(ID_TOKEN, authenticationResponse.idToken);
          }
      );
  }

  signIn() { this.lock.show(); }

  signOut() { localStorage.removeItem(ID_TOKEN); }

  authenticated(){ return tokenNotExpired(); }

}
