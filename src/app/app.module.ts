import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import {ThreadsService} from "./services/threads.service";
import { StoreModule } from "@ngrx/store";
import { INITIAL_APPLICATION_STATE, ApplicationState } from 'app/store/application-state';
import { Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction, LoadUserThreadsAction } from 'app/store/actions';
import { LoadThreadsEffectService } from 'app/store/effects/load-threads-effect.service';
import * as _ from 'lodash';
import { StoreData } from 'app/store/store-data';
import { ActionReducerMap } from '@ngrx/store/src/models';
import { UiState } from 'app/store/ui-state';



export const reducers: ActionReducerMap<ApplicationState> = {
  uiState: uiStateReducer,
  storeData: storeReducer
};

export function uiStateReducer(state: UiState, action: Action) : UiState {
 
  return state;
}

function storeReducer(state: StoreData, action: Action) : StoreData {
  switch(action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state,<UserThreadsLoadedAction>action); 
    default: 
      return state;
  }
}

function handleLoadUserThreadsAction(state: StoreData, 
  action: UserThreadsLoadedAction): StoreData {
    const userData = action.payload;
    var newState: StoreData = Object.assign({},state);

    newState = {
      participants: _.keyBy(action.payload.participants, 'id'),
      messages: _.keyBy(action.payload.messages, 'id'),
      threads: _.keyBy(action.payload.threads, 'id'),
    }

    return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //StoreModule.forRoot({storeReducer})
    StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([LoadThreadsEffectService])
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
