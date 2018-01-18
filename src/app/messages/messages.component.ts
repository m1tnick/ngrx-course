import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { uiState } from 'app/store/reducers/uiStateReducer';
import { UiState } from 'app/store/ui-state';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  message: string;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store.select("uiState").subscribe(
      (uiState : UiState) => this.message = uiState.currentError
    );
  }

  close() {
    this.message = '';
  }
}
