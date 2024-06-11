import { Component } from '@angular/core';
import {Organization} from "../services/models/organization";
import {Event} from "../services/models/event";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../core/util/consts";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent{
  p: number = 1;


  events: Array<Event> = [];
  staticEvents: Array<Event> = [];
  eventControl = new FormControl();
  eventTypes: string[] = [];
  previousEventTypes: string[] = [];
  cities: string[] = ['All'];
  selectedCity : string = 'All';
  staticOrganizations: Organization[] = [];
  organizations: Organization[] = [];

  handleChange(eventType: string) {
    this.organizations = this.staticOrganizations;
    let temp : Organization[] = [];
    if (eventType === 'trigger') {
      this.organizations.forEach(organization => {
        if (organization.city === this.selectedCity){
          temp.push(organization);
        }
      });
      this.organizations = temp;
    }
  }

  constructor(
    private http: HttpClient
  ) {
    this.loadOrganizations();
    this.loadCities();
  }

  loadOrganizations(): void {
    this.http.get<Organization[]>(API_URL + "/api/v1/organization/").subscribe(
      (response) => {
        this.organizations = response;
        this.staticOrganizations = response;
      }
    );
  }

  loadCities(){
    this.http.get<string[]>(API_URL + "/api/v1/city/").subscribe(
      (response) => {
        // this.cities = response;
        response.forEach(cities => {
          this.cities.push(cities);
        })
      }
    )
  }
}
