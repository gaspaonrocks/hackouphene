import { Component, OnInit } from '@angular/core';
import { ImplicitGrantService } from '../../services/implicit-grant.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [ImplicitGrantService],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private authenticated: boolean;
  public hashParams: object;
  private categories: Array<string> = ['artist', 'song', 'album', 'genre'];

  constructor(private implicitService: ImplicitGrantService) {
    this.authenticated = false;
    this.hashParams = {};
  }

  ngOnInit() { }

  implicitGrantFlow(data) {
    console.log(data, 'it works');
    this.implicitService.getCredentialsToken();
  }

  nothingForNow() {
    this.hashParams = this.getHashParams();
    console.log(this.hashParams);
    console.log('to be implemented...');
    if (this.hashParams !== {}) { this.authenticated = true }
    console.log(this.authenticated);
  }

  getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  onSubmit(data) {
    let submitCategory = encodeURIComponent(data.select);
    let submitQuery = encodeURIComponent(data.query);
    return this.implicitService
      .querySpotifyApi({ submitCategory, submitQuery }, this.hashParams.access_token)
      .subscribe(data => console.log(data));
  }
}
