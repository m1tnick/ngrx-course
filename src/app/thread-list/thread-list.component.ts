import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummaryVM[];

  constructor() { }

  ngOnInit() {

  }

}
