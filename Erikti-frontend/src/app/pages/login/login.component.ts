import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {TokenService} from "../../services/token/token.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../services/user/user.service";
import {User} from "../../services/models/user";
import {MessageService} from "primeng/api";
import {API_URL} from "../../core/util/consts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {username: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private http: HttpClient,
    private userService: UserService,

  ) {

  }

  login() {
    this.postData()
    this.errorMsg = [];
  }


  postData() {
    this.errorMsg = [];

    const url = API_URL + '/api/v1/auth/authenticate'; // Replace with your API endpoint

    const data = this.authRequest;// Data to be sent in the request body

    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Optional headers

    this.http.post<any>(url, data, { headers }).subscribe(
      response => {
        console.log(response.access_token as string);
        this.tokenService.accessToken = response.access_token as string;
        this.tokenService.refreshToken = response.refreshToken as string;
        this.http.get<User>(`${API_URL}/api/v1/user/username/${this.authRequest.username}`).subscribe(
          response => {
            this.userService.role = response.role as string;
          }
        )
        this.userService.username = this.authRequest.username;
        this.messageService.add(
          {
            severity: 'info',
            summary: 'User authenticated successfully',
            detail: `${this.userService.username} is authenticated`,
          }
        )

        this.router.navigate(['home']);
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


  register() {
    this.router.navigate(['register'])
  }
}
