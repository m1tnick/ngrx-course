import { Component } from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { UserThreadsLoadedAction, LoadUserThreadsAction, ThreadSelectedAction } from 'app/store/actions';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import * as _ from 'lodash';

import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import { mapStateToUnreadMessagesCounter } from 'app/thread-section/mapStateToUnreadMessagesCounter';
import { stateToTthreadSummariesSelector } from 'app/thread-section/stateToThreadSummariesSelector';
import { userNameSelector } from 'app/thread-section/userNameSelector';
@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadsSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$: Observable<number>;
  userId$: Observable<number>;
  


  constructor(private store: Store<ApplicationState>) {

      this.userName$ = store.select(userNameSelector);

      this.unreadMessagesCounter$ =
        store.map(mapStateToUnreadMessagesCounter);

      this.threadsSummaries$ = store.select(stateToTthreadSummariesSelector);

      this.currentSelectedThreadId$ = store.select(state => state.uiState.currentThreadId);


      this.userId$ = store.select(state => state.uiState.userId);
  }

  onThreadSelected(selectedThreadId:number) {
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }

}
