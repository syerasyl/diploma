import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../core/util/consts";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {
  }
  onSubmit() {
    const formData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.messageService.add({
      severity: 'success',
      detail: 'Your message has been sent.'
    });

    this.http.post( API_URL + '/api/v1/email', formData).subscribe(
    (response) => {
      console.log(response)
    }
    )

    console.log('Form Data:', formData);
    // Here you can implement the logic to send the form data to your server
    // For example, using HttpClient to post the data to an API endpoint

  }

}

