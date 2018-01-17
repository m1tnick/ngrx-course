import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { SelectUserAction, ThreadSelectedAction } from 'app/store/actions';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(private store:Store<ApplicationState>) { }

  ngOnInit() {
  }

  onSelectUser(newUserId: number) {
    this.store.dispatch(new SelectUserAction(+newUserId));
  }

}
