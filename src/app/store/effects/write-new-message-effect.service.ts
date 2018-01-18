import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { ThreadsService } from "app/services/threads.service";
import { Observable } from "rxjs/Observable";
import { SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, ErrorOccurredAction } from "app/store/actions";
import { Action } from "@ngrx/store";
import 'rxjs/add/observable/of';

@Injectable()
export class WriteNewMessageEffectService {

    constructor(private actions$: Actions, private threadService: ThreadsService) {

    }

    @Effect()
    newMessages$: Observable<any> =
        this.actions$
        .ofType(SEND_NEW_MESSAGE_ACTION)
        .debug("sending new message to the server")
        .switchMap((action: SendNewMessageAction) => this.threadService.saveNewMessage(action.payload))
        .catch(() => Observable.of(new ErrorOccurredAction("Error occurred while saving message")) );
}