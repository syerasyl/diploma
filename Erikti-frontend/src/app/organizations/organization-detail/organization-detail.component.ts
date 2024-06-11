import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '../../services/models/organization';
import { HttpClient } from '@angular/common/http';
import {Event} from "../../services/models/event";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {API_URL} from "../../core/util/consts";

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css'] // Fixed typo here
})
export class OrganizationDetailComponent {
  organization: Organization = {}; // Assuming Organization is an interface, initializing with an empty object is acceptable
  events: Event[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    const organizationIdString = activatedRoute.snapshot.paramMap.get('organizationId');
    if (organizationIdString) {
      const organizationId = Number(organizationIdString);
      if (!isNaN(organizationId)) {
        this.loadOrganizationDataById(organizationId);
      } else {
        console.error('Invalid organizationId:', organizationIdString);
      }
    } else {
      console.error('No organizationId found in route');
    }

  }

  loadOrganizationDataById(organizationId: number) {
    this.http.get<Organization>( API_URL + '/api/v1/organization/' + organizationId).subscribe(
      (response) => {
        console.log(response)
        this.organization = response;
        this.loadOrganizationEventList(organizationId)
      },
      (error) => {
        console.error('Error loading organization data:', error);
      }
    );
  }

  loadOrganizationEventList(organizationId : number){
    this.http.get<Event[]>(`${API_URL}/api/v1/event/organization/${organizationId}`).subscribe(
      (response) => {
        console.log(response);
        this.events = response;
      }
    )
  }
}
