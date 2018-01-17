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

import { StoreData } from 'app/store/store-data';
import { ActionReducerMap } from '@ngrx/store/src/models';
import { UiState, INITIAL_UI_STATE } from 'app/store/ui-state';
import { StoreDevtoolsModule } from "@ngrx/store-devtools"
import { uiState } from 'app/store/reducers/uiStateReducer';
import { storeData } from 'app/store/reducers/storeDataReducer';
import { combineReducers } from '@ngrx/store/src/utils';
import { WriteNewMessageEffectService } from 'app/store/effects/write-new-message-effect.service';
import { HttpModule } from '@angular/http';
import { ServerNotificationEffectsService } from 'app/store/effects/server-notification-effects.service';


const reducers = {
  uiState,
  storeData
};


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
    HttpModule,
    StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([LoadThreadsEffectService, WriteNewMessageEffectService, ServerNotificationEffectsService]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
