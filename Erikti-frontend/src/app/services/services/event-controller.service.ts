/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createEvent } from '../fn/event-controller/create-event';
import { CreateEvent$Params } from '../fn/event-controller/create-event';
import { getAllEvents } from '../fn/event-controller/get-all-events';
import { GetAllEvents$Params } from '../fn/event-controller/get-all-events';
import { getEventById } from '../fn/event-controller/get-event-by-id';
import { GetEventById$Params } from '../fn/event-controller/get-event-by-id';
import { getUsersAllEvents } from '../fn/event-controller/get-users-all-events';
import { GetUsersAllEvents$Params } from '../fn/event-controller/get-users-all-events';

@Injectable({ providedIn: 'root' })
export class EventControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createEvent()` */
  static readonly CreateEventPath = '/api/v1/event';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createEvent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEvent$Response(params: CreateEvent$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createEvent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createEvent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEvent(params: CreateEvent$Params, context?: HttpContext): Observable<{
}> {
    return this.createEvent$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getEventById()` */
  static readonly GetEventByIdPath = '/api/v1/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventById$Response(params: GetEventById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getEventById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEventById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventById(params: GetEventById$Params, context?: HttpContext): Observable<{
}> {
    return this.getEventById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getUsersAllEvents()` */
  static readonly GetUsersAllEventsPath = '/api/v1/event/username/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersAllEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersAllEvents$Response(params: GetUsersAllEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getUsersAllEvents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersAllEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersAllEvents(params: GetUsersAllEvents$Params, context?: HttpContext): Observable<{
}> {
    return this.getUsersAllEvents$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllEvents()` */
  static readonly GetAllEventsPath = '/api/v1/event/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEvents$Response(params?: GetAllEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllEvents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEvents(params?: GetAllEvents$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllEvents$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
