/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { register } from '../fn/volunteer-event-registration-controller/register';
import { Register$Params } from '../fn/volunteer-event-registration-controller/register';
import { unregister } from '../fn/volunteer-event-registration-controller/unregister';
import { Unregister$Params } from '../fn/volunteer-event-registration-controller/unregister';

@Injectable({ providedIn: 'root' })
export class VolunteerEventRegistrationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/v1/event-registration/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method doesn't expect any request body.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `unregister()` */
  static readonly UnregisterPath = '/api/v1/event-registration/unregister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unregister()` instead.
   *
   * This method doesn't expect any request body.
   */
  unregister$Response(params: Unregister$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return unregister(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unregister$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unregister(params: Unregister$Params, context?: HttpContext): Observable<{
}> {
    return this.unregister$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
