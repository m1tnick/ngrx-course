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
import { combineReducers, compose } from '@ngrx/store';
import { WriteNewMessageEffectService } from 'app/store/effects/write-new-message-effect.service';
import { HttpModule } from '@angular/http';
import { ServerNotificationEffectsService } from 'app/store/effects/server-notification-effects.service';
import { MarkMessagesAsReadEffectService } from 'app/store/effects/mark-messages-as-read-effect.service';
import { MessagesComponent } from './messages/messages.component';
import {storeFreeze} from "ngrx-store-freeze";
import { routes } from 'app/routes';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CustomRouterStateSerializer } from 'app/store/utils';
import * as fromRouter from '@ngrx/router-store';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';

const reducers = {
  uiState,
  storeData,
  routerReducer: fromRouter.routerReducer
};
export const metaReducers = [storeFreeze];

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    MessagesComponent,
    HomeComponent,
    AboutComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash:true}),
    StoreModule.forRoot(reducers, {metaReducers, initialState: INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([MarkMessagesAsReadEffectService, LoadThreadsEffectService, WriteNewMessageEffectService, ServerNotificationEffectsService]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule
  ],
  providers: [ {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
