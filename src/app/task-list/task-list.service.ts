import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class TaskListService {

  private static TASKS_ENDPOINT =
      'https://wt-a101b2647f290471bcf73b8be5294f73-0.run.webtask.io/tasks';


  constructor(private authHttp: AuthHttp) {}

  loadTasks$(): Observable<any> {
    return this.authHttp.get(TaskListService.TASKS_ENDPOINT);
  }

  addTask$(task): Observable<any> {
    return this.authHttp.post(
      TaskListService.TASKS_ENDPOINT,
      { description: task }
    );
  }

  deleteTask$(task): Observable<any> {
    return this.authHttp.delete(
       TaskListService.TASKS_ENDPOINT + '?id=' + task._id
    );
  }

  updateTaskCheckedStatus$(task): Observable<any> {
    return this.authHttp.put(
      TaskListService.TASKS_ENDPOINT,
       task
    );
  }

}
