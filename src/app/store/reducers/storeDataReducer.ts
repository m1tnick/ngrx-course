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
      //const newStoreState = _.cloneDeep(state);
      const newStoreState: StoreData = {
        participants: state.participants,
        threads: Object.assign({}, state.threads),
        messages: Object.assign({}, state.messages)
      };

      newStoreState.threads[action.payload.threadId] = Object.assign({}, state.threads[action.payload.threadId])

      const currentThread = newStoreState.threads[action.payload.threadId];

      const newMessage: Message = {
        text: action.payload.text,
        threadId: action.payload.threadId,
        timestamp: new Date().getTime(),
        participantId: action.payload.participantId,
        id: uuid()
      };

      currentThread.messageIds = currentThread.messageIds.slice(0);
      currentThread.messageIds.push(newMessage.id);
      newStoreState.messages[newMessage.id] = newMessage;

      return newStoreState;
  }

  function handleNewMessagesReceivedAction(state: StoreData, 
    action: NewMessageReceivedAction) {

      const newStoreState: StoreData = {
        participants: state.participants,
        threads: _.clone(state.threads),
        messages: _.clone(state.messages)
      };
      
      const newMessage = action.payload.unreadMessages,
        currentThreadId = action.payload.currentThreadId,
        currentUserId = action.payload.currentUserId;

      newMessage.forEach(message => {
        newStoreState.messages[message.id] = message;

        newStoreState.threads[message.threadId] = _.clone(state.threads[message.threadId]);

        const messageThread = newStoreState.threads[message.threadId];

        messageThread.messageIds = newStoreState.threads[message.threadId].messageIds.slice(0);
        messageThread.messageIds.push(message.id);

        if(message.threadId !== currentThreadId) {
          messageThread.participants = _.clone(state.threads[message.threadId].participants);


          messageThread.participants[currentUserId] += 1;
        }
      });
      return newStoreState;
  }

  function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction) {

    const newStoreState: StoreData = {
      participants: _.clone(state.participants),
      threads: _.clone(state.threads),
      messages: _.clone(state.messages)
    };


    newStoreState.threads[action.payload.selectedThreadId] = _.clone(state.threads[action.payload.selectedThreadId]);

    const currentThread = newStoreState.threads[action.payload.selectedThreadId];

    currentThread.participants = _.clone(currentThread.participants);

    currentThread.participants[action.payload.currentUserId] = 0;

    return newStoreState;
  }


