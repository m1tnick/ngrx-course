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
import { UiState } from 'app/store/ui-state';
import { uiState } from 'app/store/reducers/uiStateReducer';
@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadsSummaries$: Observable<ThreadSummaryVM[]>;

  uiState: UiState;
  


  constructor(private store: Store<ApplicationState>) {

      this.userName$ = store.select(userNameSelector);

      this.unreadMessagesCounter$ =
        store.map(mapStateToUnreadMessagesCounter);

      this.threadsSummaries$ = store.select(stateToTthreadSummariesSelector);

      store.select(state => state.uiState).subscribe(uiState => this.uiState = _.cloneDeep(uiState));

      //this.userId$ = store.select(state => state.uiState.userId);
  }

  onThreadSelected(selectedThreadId:number) {
    this.store.dispatch(new ThreadSelectedAction({selectedThreadId, currentUserId: this.uiState.userId}));
  }

}
