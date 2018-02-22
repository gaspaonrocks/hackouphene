import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const spotifyConfig = {
  authorizeUrl: 'https://accounts.spotify.com/authorize',
  clientId: '619bb4b421c648e1bc85039fa553097a',
  redirectUri: 'http://localhost:4200/search',
  responseType: 'token',
  state: '123456'
}

@Injectable()
export class ImplicitGrantService {
  targetUrl = spotifyConfig.authorizeUrl +
    '?client_id=' +
    encodeURIComponent(spotifyConfig.clientId) +
    '&redirect_uri=' +
    encodeURIComponent(spotifyConfig.redirectUri) +
    '&response_type=' +
    encodeURIComponent(spotifyConfig.responseType) +
    '&state=' +
    encodeURIComponent(spotifyConfig.state);

  constructor(private http: HttpClient) { }

  getCredentialsToken() {
    return window.location = this.targetUrl;
  }

  querySpotifyApi(query, accessToken) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + accessToken
      })
    };
    return this.http.get('https://api.spotify.com/v1/search?q=' + query.submitQuery + '&type=' + query.submitCategory, httpOptions)
  }
}
