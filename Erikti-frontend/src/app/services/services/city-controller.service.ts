/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getCityList } from '../fn/city-controller/get-city-list';
import { GetCityList$Params } from '../fn/city-controller/get-city-list';

@Injectable({ providedIn: 'root' })
export class CityControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCityList()` */
  static readonly GetCityListPath = '/api/v1/city/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCityList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCityList$Response(params?: GetCityList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL'>>> {
    return getCityList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCityList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCityList(params?: GetCityList$Params, context?: HttpContext): Observable<Array<'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL'>> {
    return this.getCityList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL'>>): Array<'ASTANA' | 'ALMATY' | 'KYZYLORDA' | 'TARAZ' | 'SHYMKENT' | 'AKTAU' | 'SEMEI' | 'OSKEMEN' | 'AKTOBE' | 'PAVLODAR' | 'TALDYKORGAN' | 'KOKSHETAU' | 'KOSTANAY' | 'ATYRAY' | 'TURKISTAN' | 'PETROPAVL' | 'ZHEZKAZGAN' | 'ORAL'> => r.body)
    );
  }

}
