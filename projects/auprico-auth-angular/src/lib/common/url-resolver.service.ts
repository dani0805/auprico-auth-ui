import { Injectable } from '@angular/core';

@Injectable()
export class UrlResolverService {
  constructor() { }

  apiUrlForPath(urlComponents: string[]): string {
    const urljoin = require('url-join');
    const fullUrl = urljoin(['http://localhost:8000/'].concat(urlComponents));
    return fullUrl;
  }

  localUrlForPath(urlComponents: string[]): string {
    const urljoin = require('url-join');
    const fullUrl = urljoin(['http://localhost:3600/'].concat(urlComponents));
    return fullUrl;
  }

}
