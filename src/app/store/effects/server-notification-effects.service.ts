import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ThreadsService } from "app/services/threads.service";
import { Effect } from "@ngrx/effects";
import { NewMessageReceivedAction } from "app/store/actions";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { uiState } from "app/store/reducers/uiStateReducer";


@Injectable()
export class ServerNotificationEffectsService {

    constructor(private threadService: ThreadsService,
        private store: Store<ApplicationState>) {}

    @Effect()
    newMessages$ = Observable.interval(3000)
        .withLatestFrom(this.store.select("uiState"))
        .map(([any,uiState]) => uiState)
        .filter(uiState => uiState.userId !== undefined)
        .switchMap((uiState) => this.threadService.loadNewMessagesForUser(uiState.userId)
        .map(messages => new NewMessageReceivedAction(messages)));

}