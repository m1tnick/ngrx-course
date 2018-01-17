import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { ThreadsService } from "app/services/threads.service";
import { Observable } from "rxjs/Observable";
import { SEND_NEW_MESSAGE_ACTION, SendNewMessageAction } from "app/store/actions";
import { Action } from "@ngrx/store";


@Injectable()
export class WriteNewMessageEffectService {

    constructor(private actions$: Actions, private threadService: ThreadsService) {

    }

    @Effect({dispatch: false})
    newMessages$: Observable<any> =
        this.actions$
        .ofType(SEND_NEW_MESSAGE_ACTION)
        .switchMap((action: SendNewMessageAction) => this.threadService.saveNewMessage(action.payload));
}