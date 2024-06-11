/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface Unregister$Params {
  eventId: number;
  volunteerId: number;
}

export function unregister(http: HttpClient, rootUrl: string, params: Unregister$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, unregister.PATH, 'delete');
  if (params) {
    rb.query('eventId', params.eventId, {});
    rb.query('volunteerId', params.volunteerId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

unregister.PATH = '/api/v1/event-registration/unregister';
