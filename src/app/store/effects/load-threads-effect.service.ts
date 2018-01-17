import { Injectable } from '@angular/core';
import { ThreadsService } from 'app/services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction, SELECT_USER_ACTION, LoadUserThreadsAction } from 'app/store/actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions, 
    private threadsService: ThreadsService) {  }

    @Effect()
    userThreads$: Observable<Action> = 
      this.actions$
      .ofType(LOAD_USER_THREADS_ACTION)
      //.do(val => console.log("action received", val))
      .debug("action received")
      .switchMap((action: LoadUserThreadsAction) => this.threadsService.loadUserThreads(action.payload))
      //.do(val => console.log("data received via HTTP request", val))
      .debug("data received via HTTP request")
      .map(allUserData => {console.log(allUserData); return new UserThreadsLoadedAction(allUserData)});


    @Effect()
    newUserSelected$: Observable<Action> =
      this.actions$
      .ofType(SELECT_USER_ACTION)
      .debug("New user selected")
      .map((action: LoadUserThreadsAction) => new LoadUserThreadsAction(action.payload));
}
