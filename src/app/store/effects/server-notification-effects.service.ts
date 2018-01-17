import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ThreadsService } from "app/services/threads.service";
import { Effect } from "@ngrx/effects";
import { NewMessageReceivedAction } from "app/store/actions";


@Injectable()
export class ServerNotificationEffectsService {

    constructor(private threadService: ThreadsService) {}

    @Effect()
    newMessages$ = Observable.interval(3000)
        .switchMap(() => this.threadService.loadNewMessagesForUser()
        .map(messages => new NewMessageReceivedAction(messages)));

}