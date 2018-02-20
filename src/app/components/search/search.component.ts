import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories = [
    'artist',
    'song',
    'album',
    'genre'
  ];

  constructor() {}

  ngOnInit() {}

  searchResults(data) {
    console.log(data, 'it works');
  }
}
