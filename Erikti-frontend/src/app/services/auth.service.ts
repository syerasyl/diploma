import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private handler = inject(HttpBackend);
  private http = new HttpClient(this.handler);
  private messageService = inject(MessageService);



  constructor() { }

  // login(username : string, password: string) {
  //   return this.http
  //     .post()
  // }
}
