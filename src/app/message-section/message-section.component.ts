import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { Observable } from 'rxjs/Observable';
import { messageParticipantNamesSelector } from 'app/message-section/messageParticipantNamesSelector';
import { messagesSelector } from 'app/message-section/messagesSelector';
import { MessageVM } from 'app/message-section/message.vm';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  constructor(private store: Store<ApplicationState>) { 
    this.participantNames$ = store.select(messageParticipantNamesSelector);
    this.messages$ = store.select(messagesSelector);
  }

}
