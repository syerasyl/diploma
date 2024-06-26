/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { OrganizationControllerService } from './services/organization-controller.service';
import { EventControllerService } from './services/event-controller.service';
import { VolunteerEventRegistrationControllerService } from './services/volunteer-event-registration-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { VolunteerControllerService } from './services/volunteer-controller.service';
import { CityControllerService } from './services/city-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    OrganizationControllerService,
    EventControllerService,
    VolunteerEventRegistrationControllerService,
    AuthenticationControllerService,
    UserControllerService,
    VolunteerControllerService,
    CityControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
