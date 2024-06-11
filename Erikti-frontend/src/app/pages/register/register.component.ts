import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {RegisterRequest} from "../../services/models/register-request";
import {  Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../../services/token/token.service";
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";
import {API_URL} from "../../core/util/consts";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {username: '', password: '', role: "VOLUNTEER", email: ''};
  errorMsg: Array<string> = [];
  // messageService: inject(MessageService);

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private http : HttpClient,
    private userService: UserService,
  ) {

  }


  register() {
    this.errorMsg = [];

    const url = API_URL + '/api/v1/auth/register'; // Replace with your API endpoint

    const data = this.registerRequest;// Data to be sent in the request body

    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Optional headers

    this.http.post<any>(url, data, { headers }).subscribe(
      response => {
        this.errorMsg = [];
        console.log(response);
        // console.log(response.access_token as string);
        this.tokenService.accessToken = response.access_token as string;
        this.tokenService.refreshToken = response.refreshToken as string;
        this.userService.username = this.registerRequest.username;
        this.userService.role = this.registerRequest.role as string;
        this.messageService.add(
          {
            severity: 'success',
            summary: 'User registered',
            detail: ''
          }
        )

        this.router.navigate(['events']);


      },
      error => {
        if (error.error.validationErrors) {
          this.errorMsg = error.error.validationErrors;
          this.messageService.add(
            {
              severity: 'error',
              detail: this.errorMsg.toString(),
            }
          )
        } else {
          this.errorMsg.push(
            error.error.error
          );
          this.messageService.add(
            {
              severity: 'error',
              detail: error.error.error,
            }
          )
        }
      }
    );


  }

  login() {
      this.router.navigate(['login']);
  }

  selectRole(role: 'ORGANIZATION' | 'VOLUNTEER') {
    this.registerRequest.role = role;
  }
}
