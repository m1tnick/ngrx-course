import { Component, OnInit } from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { LoadUserThreadsAction } from 'app/store/actions';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import * as _ from 'lodash';

import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import { mapStateToUserName } from 'app/thread-section/mapStateToUserName';
import { mapStateToUnreadMessagesCounter } from 'app/thread-section/mapStateToUnreadMessagesCounter';
import { stateToTthreadSummariesSelector } from 'app/thread-section/stateToThreadSummariesSelector';
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

      this.userName$ = store
                      .skip(1)
                      .map(mapStateToUserName);

      this.unreadMessagesCounter$ =
        store
        .skip(1)                      
        .map(mapStateToUnreadMessagesCounter);

       
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
