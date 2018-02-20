import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import spotifyConfig from '../config/spotifyApi';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

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

  constructor(private http: HttpClient) {}

  getCredentialsToken() {
    return window.location = this.targetUrl;
  }
}
