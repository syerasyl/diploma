import {Component, HostListener, OnInit} from '@angular/core';
import {TokenService} from "./services/token/token.service";
import {UserService} from "./services/user/user.service";
import {Router} from "@angular/router";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'volunteer-frontend';
  username: string;
  role: string;
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    // private primengConfig: PrimeNGConfig,
  ) {
    this.username = userService.username;
    this.role = userService.role;
  }

  checkToken() {
    return this.tokenService.accessToken === undefined || this.tokenService.accessToken === null;
  }
  loadUser() {
    this.tokenService.accessToken
  }

  logoutHandler(){
     this.userService.deleteCache();
     this.tokenService.deleteCache();
    this.router.navigate(['events']);
  }

  ngOnInit(): void {
    this.userService.username$.subscribe(username => this.username = username);
    this.userService.role$.subscribe(role => this.role = role);
    // this.primengConfig.tripple();
  }


}
