import { ApplicationState } from "app/store/application-state";
import { Thread } from "../../../shared/model/thread";
import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import * as _ from 'lodash';
import { buildThreadParticipantsList } from "app/shared/mapping/buildThreadParticipantsList";

export function stateToTthreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[]
 {
    const threads = _.values<Thread>(state.storeData.threads);
    return threads.map(_.partial(mapThreadToThreadSummary, state));
  }

  function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
     const lastMessageId = _.last(thread.messageIds),
      lastMessage = state.storeData.messages[lastMessageId];


    return {
      id: thread.id,
      participantNames: buildThreadParticipantsList(state, thread),
      lastMessageText: lastMessage.text,
      timestamp:  lastMessage.timestamp
    }
  }