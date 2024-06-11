/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetCityList$Params {
}

export function getCityList(http: HttpClient, rootUrl: string, params?: GetCityList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL'>>> {
  const rb = new RequestBuilder(rootUrl, getCityList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL'>>;
    })
  );
}

getCityList.PATH = '/api/v1/city/';
