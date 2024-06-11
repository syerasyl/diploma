import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { Event} from "../../services/models/event";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {API_URL} from "../../core/util/consts";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css'
})
export class NewEventComponent implements OnInit{
  eventForm: FormGroup;
  cities : string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
              ) {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventType: ['', Validators.required],
      city: ['', Validators.required],
      // organization: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadCities();
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventType: ['', Validators.required],
      city: ['', Validators.required],
      link: ['', Validators.required]
      // organization: [{}, Validators.required]
    });
  }

  onSubmit(): void {

    if (this.eventForm.valid) {

      const formData = this.eventForm.value as Event;
      formData.eventStartDate = new Date(formData.eventStartDate).getTime();
      formData.eventEndDate = new Date(formData.eventEndDate).getTime();
      formData.organization = {};
      this.http.post(API_URL + "/api/v1/event/guest", formData).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add(
            {
              severity: "success",
              detail: 'Event successfully added'
            }
          )
          this.router.navigate(['events']);
        }
      )
      // Call your service method to create the event using formData
    } else {
      this.messageService.add(
        {
          severity: "error",
          detail: 'Form is not valid, fill all fields.',
        }
      )    }
  }

  loadCities(){
    this.http.get<string[]>( API_URL + "/api/v1/city/").subscribe(
      (response) => {
        this.cities = response;
      }
    )
  }


}
