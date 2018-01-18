import { StoreData } from "app/store/store-data";
import { Action } from "@ngrx/store";
import { USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction, SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, NEW_MESSAGE_RECEIVED_ACTION, NewMessageReceivedAction, THREAD_SELECTED_ACTION, ThreadSelectedAction } from "app/store/actions";
import * as _ from 'lodash';
import { Message } from "../../../../shared/model/message";

const uuid = require('uuid/V4');

export function storeData(state: StoreData, action: Action) : StoreData {
    switch(action.type) {
      case USER_THREADS_LOADED_ACTION:
        return handleLoadUserThreadsAction(state,<UserThreadsLoadedAction>action); 
      case SEND_NEW_MESSAGE_ACTION:
        return handleSendNewMessageAction(state, <SendNewMessageAction> action);
      case NEW_MESSAGE_RECEIVED_ACTION:
        return handleNewMessagesReceivedAction(state, <NewMessageReceivedAction> action);
      case THREAD_SELECTED_ACTION:
        return handleThreadSelectedAction(state, <ThreadSelectedAction> action);
      default: 
        return state;
    }
  }
  
  function handleLoadUserThreadsAction(state: StoreData, 
    action: UserThreadsLoadedAction): StoreData {
  
      return {
        participants: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
        threads: _.keyBy(action.payload.threads, 'id'),
      }
  }
  
  function handleSendNewMessageAction(state: StoreData, 
    action: SendNewMessageAction) {
      const newStoreState = _.cloneDeep(state);

      const currentThread = newStoreState.threads[action.payload.threadId];

      const newMessage: Message = {
        text: action.payload.text,
        threadId: action.payload.threadId,
        timestamp: new Date().getTime(),
        participantId: action.payload.participantId,
        id: uuid()
      };

      currentThread.messageIds.push(newMessage.id);
      newStoreState.messages[newMessage.id] = newMessage;

      return newStoreState;
  }

  function handleNewMessagesReceivedAction(state: StoreData, 
    action: NewMessageReceivedAction) {
      const newStoreState = _.cloneDeep(state);

      const newMessage = action.payload.unreadMessages,
        currentThreadId = action.payload.currentThreadId,
        currentUserId = action.payload.currentUserId;

      newMessage.forEach(message => {
        newStoreState.messages[message.id] = message;
        newStoreState.threads[message.threadId].messageIds.push(message.id);

        if(message.threadId !== currentThreadId) {
          newStoreState.threads[message.threadId].participants[currentUserId] += 1;
        }
      });
      return newStoreState;
  }

  function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction) {
    const newStoreState = _.cloneDeep(state),
          currentThread = newStoreState.threads[action.payload.selectedThreadId];

    currentThread.participants[action.payload.currentUserId] = 0;

    return newStoreState;
  }


