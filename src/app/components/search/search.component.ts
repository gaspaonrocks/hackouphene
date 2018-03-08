import { Component, OnInit } from "@angular/core";
import { ImplicitGrantService } from "../../services/implicit-grant.service";
import { ObservableMedia } from "@angular/flex-layout";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  providers: [ImplicitGrantService],
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  private authenticated: boolean;
  public hashParams: object;
  public receivedData: object;
  public artists: Array<object>;
  private categories: Array<string> = ["artist", "song", "album", "genre"];
  public cols: Observable<number>;

  constructor(
    private implicitService: ImplicitGrantService,
    private observableMedia: ObservableMedia
  ) {
    this.authenticated = false;
    this.hashParams = {};
    this.receivedData = {};
    this.artists = [];
  }

  ngOnInit() {
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 3],
      ["lg", 4],
      ["xl", 5]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia
      .asObservable()
      .map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        console.log(this.cols);
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }

  implicitGrantFlow(data) {
    this.implicitService.getCredentialsToken();
  }

  nothingForNow() {
    this.hashParams = this.getHashParams();
    if (this.hashParams !== {}) {
      this.authenticated = true;
    }
  }

  getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  onSubmit(data) {
    const submitCategory = encodeURIComponent(data.select);
    const submitQuery = encodeURIComponent(data.query);
    return this.implicitService
      .querySpotifyApi(
        { submitCategory, submitQuery },
        this.hashParams.access_token
      )
      .subscribe(dataFromSpotify => {
        this.artists = dataFromSpotify.artists.items;
        console.log(dataFromSpotify.artists.items);
      });
  }

  getImgUrl(artist) {
    return artist.images.length >= 1
      ? artist.images[0].url
      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  }
}
