import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummaryVM[];

  @Input()
  currentSelectedThreadId:number;

  @Output()
  threadSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  selectThread(threadId: number) {
    this.threadSelected.next(threadId);
  }

}
