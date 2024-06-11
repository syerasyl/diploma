import {Component} from '@angular/core';
import {Event} from '../services/models/event'
import {FormControl} from "@angular/forms";
import {EventControllerService} from "../services/services/event-controller.service";
import {HttpClient} from "@angular/common/http";
import {City, Volunteer} from "../services/models/volunteer";
import {UserService} from "../services/user/user.service";
import {API_URL} from "../core/util/consts";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  p: number = 1;
  events: Array<Event>;
  staticEvents: Array<Event>;
  eventControl = new FormControl();
  eventTypes: string[] = [];
  previousEventTypes: string[] = [];
  cities: string[] = ['All'];
  selectedCity : string = 'All';
  baseUrl : string = '';
  volunteer : Volunteer = {};
  registeredEvents: Event[] = [];



  constructor(
    private eventService: EventControllerService,
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.events = [];
    this.staticEvents = [];
    this.loadEvents();
    this.loadCities();
    this.loadVolunteerData();
  }

  filterEvents() {
    // Implement your logic to filter events based on selectedEventNames
  }
  handleChange(eventType: string) {
    // console.log(eventType);

    this.events = this.staticEvents;
    if (this.previousEventTypes.includes(eventType)){
      for( let i = 0; i < this.events.length; i++){
        if (this.previousEventTypes[i] === eventType){
          this.previousEventTypes.splice(i, 1);
        }
      }
    } else {
      if (eventType !== 'trigger'){
        this.previousEventTypes.push(eventType);
      }
    }


    let temp : Event[] = [];

    this.events.forEach(event => {
      if (this.previousEventTypes.includes(event.eventType as string) && (event.city === this.selectedCity || this.selectedCity === 'All')) {
          temp.push(event);
        // console.log(1 +  " " + event.city + " " + 2 + " " + this.selectedCity);

      }
      // if ( event.city === this.selectedCity){
      //   console.log(1 +  " " + event.city + " " + 2 + " " + this.selectedCity);
      //
      //   temp.push(event)
      // }
    });
    this.events = temp;

    if (this.previousEventTypes.length === 0){
      this.events = this.staticEvents;
    }
  }

  loadEvents(){
    this.http.get<Event[]>(API_URL + "/api/v1/event/").subscribe(
        (response) => {
          this.events = response;
          this.staticEvents = response;
          response.forEach(event => {
            if (!this.eventTypes.includes(event.eventType as string)) {
              this.eventTypes.push(event.eventType as string);
            }
            // if (!this.cities.includes(event.city as string)){
            //   this.cities.push(event.city as string);
            // }
          });
        },
        // error => console.log(error)
    );
  }
  loadCities(){
    this.http.get<string[]>(API_URL +"/api/v1/city/").subscribe(
      (response) => {
        this.cities = response;
      }
    )
  }



  applyToEvent(eventId : number) {
    console.log(this.volunteer);

        const url = API_URL + `/api/v1/event-registration/register?eventId=${eventId}&volunteerId=${this.volunteer.volunteerId}`;
        this.http.post(url, this.volunteer).subscribe(
          (response) => {
              console.log(response);
              this.loadVolunteerEvents();
          }
        );
  }

  loadVolunteerData(){
    if (this.userService.username != null){
      this.http.get<Volunteer>(`${API_URL}/api/v1/volunteer/username?username=${this.userService.username}`).subscribe(
        (response) => {
          this.volunteer = response;
          this.loadVolunteerEvents()
        }
      );
    }
  }

  loadVolunteerEvents(){
    this.http.get<Event[]>(`${API_URL}/api/v1/event-registration/volunteer/${this.volunteer.volunteerId}`).subscribe(
      (response) => {
        this.registeredEvents = response;
        console.log(this.registeredEvents);
      }
    )
  }

  checkIfAlreadyRegisteredOnEvent(eventId: number){
    let exist : boolean = false;
    this.registeredEvents.forEach((event: Event) => {
      if (event.eventId === eventId){
        exist  = true;
      }
    });
    return exist;
  }

  unapplyToEvent(eventId: number) {

    console.log(this.volunteer);

    const url = `${API_URL}/api/v1/event-registration/unregister?eventId=${eventId}&volunteerId=${this.volunteer.volunteerId}`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);
        this.loadVolunteerEvents();
      }
    );
  }

  isVolunteer() {
    if (!this.volunteer || typeof this.volunteer !== 'object') {
      return false;
    }
    return Object.keys(this.volunteer).length !== 0;  }
}
