import { Injectable } from '@angular/core';
import { ThreadsService } from 'app/services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction } from 'app/store/actions';
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
      .switchMap(() => this.threadsService.loadUserThreads())
      .map(allUserData => {console.log(allUserData); return new UserThreadsLoadedAction(allUserData)});
}
