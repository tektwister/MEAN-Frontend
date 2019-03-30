import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any;
  constructor(public auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.auth.destroySession();
    this.router.navigate(['/login']);
  }

  isParticipant() {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    else {
      return false;
    }

  }
}
