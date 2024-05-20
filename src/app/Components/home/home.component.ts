import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,TranslocoModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
