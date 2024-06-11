/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getVolunteerById } from '../fn/volunteer-controller/get-volunteer-by-id';
import { GetVolunteerById$Params } from '../fn/volunteer-controller/get-volunteer-by-id';
import { getVolunteerByUsername } from '../fn/volunteer-controller/get-volunteer-by-username';
import { GetVolunteerByUsername$Params } from '../fn/volunteer-controller/get-volunteer-by-username';

@Injectable({ providedIn: 'root' })
export class VolunteerControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getVolunteerById()` */
  static readonly GetVolunteerByIdPath = '/api/v1/volunteer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVolunteerById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVolunteerById$Response(params: GetVolunteerById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getVolunteerById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVolunteerById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVolunteerById(params: GetVolunteerById$Params, context?: HttpContext): Observable<{
}> {
    return this.getVolunteerById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getVolunteerByUsername()` */
  static readonly GetVolunteerByUsernamePath = '/api/v1/volunteer/username';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVolunteerByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVolunteerByUsername$Response(params: GetVolunteerByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getVolunteerByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVolunteerByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVolunteerByUsername(params: GetVolunteerByUsername$Params, context?: HttpContext): Observable<{
}> {
    return this.getVolunteerByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
