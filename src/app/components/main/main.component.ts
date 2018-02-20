import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  events = [];
  opened = false;
  shouldRun = true;
  constructor() {}

  ngOnInit() {}

  dealingWithEvents(e) {
    if (this.events.length >= 5) { this.events.shift(); }
    this.events.push(e);
  }
}
