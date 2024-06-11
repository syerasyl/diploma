import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit{

  constructor(
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/events']);
    }, 3000); // 3000 milliseconds = 3 seconds
  }
}
