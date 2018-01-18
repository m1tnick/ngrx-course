import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { ThreadsService } from "app/services/threads.service";
import { THREAD_SELECTED_ACTION, ThreadSelectedAction } from "app/store/actions";


@Injectable()
export class MarkMessagesAsReadEffectService {

    constructor(private actions$: Actions, private threadService: ThreadsService) {}

    @Effect()
    markMessagesAsRead$ = this.actions$
        .ofType(THREAD_SELECTED_ACTION)
        .switchMap((action: ThreadSelectedAction) =>
             this.threadService.markMessagesAsRead(
                 action.payload.currentUserId, action.payload.selectedThreadId)
                );
}