import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private _authenticationService: AuthenticationService, private _router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this._authenticationService.IsAuthenticated();
  }

  LogOut() {
    this._authenticationService.LogOut();
    this.isLoggedIn = this._authenticationService.IsAuthenticated();
    this._router.navigateByUrl('/home');
  }
}
