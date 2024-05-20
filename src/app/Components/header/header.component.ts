import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { TranslationService } from '../../Services/translation.service';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, TranslocoModule,NgbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  selectedLanguage: string = '';
  navbarCollapsed = true;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _translationService: TranslationService
  ) {
    this._translationService.InitLanguage();
    this.selectedLanguage = this._translationService.GetLanguage();
  }

  ngOnInit(): void {
    this.isLoggedIn = this._authenticationService.IsAuthenticated();
    this.selectedLanguage = this._translationService.GetLanguage();
  }

  ChangeLanguage() {
    this._translationService.SetLanguage(this.selectedLanguage);
  }

  LogOut() {
    this._authenticationService.LogOut();
    this.isLoggedIn = this._authenticationService.IsAuthenticated();
    this._router.navigateByUrl('/home');
  }
}
