import { Component, OnInit } from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { LoadUserThreadsAction } from 'app/store/actions';
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
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadsSummaries$: Observable<ThreadSummaryVM>[];

  constructor(private threadsService: ThreadsService,
    private store: Store<ApplicationState>) {

      this.userName$ = store.select(userNameSelector);

      this.unreadMessagesCounter$ =
        store.map(mapStateToUnreadMessagesCounter);

      this.threadsSummaries$ = store.select(stateToTthreadSummariesSelector);
  }


  ngOnInit() {
    this.threadsService.loadUserThreads()
      .subscribe(
        allUserData => this.store.dispatch(
          new LoadUserThreadsAction(allUserData)
        )
      );
  }

}
