import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translocoService: TranslocoService) {}

  SetLanguage(language: any) {
    this.translocoService.setActiveLang(language);
    this.translocoService.setDefaultLang(language);

    localStorage.setItem('lang', language);

    if (language == 'en-US') {
      this.switchDirection('ltr');
    } else if (language == 'ar-EG') {
      this.switchDirection('rtl');
    }
  }

  GetLanguage() {
    return this.translocoService.getActiveLang();
  }

  InitLanguage() {
    localStorage.getItem('lang') == null
      ? this.SetLanguage(this.translocoService.getDefaultLang())
      : this.SetLanguage(localStorage.getItem('lang'));
  }

  private switchDirection(direction: string) {
    let directionLink = document.getElementById(
      'app-direction'
    ) as HTMLLinkElement;

    if (directionLink) {
      directionLink.href = direction + '.css';
    }

    document.querySelector('html')?.setAttribute('dir', direction);
  }
}
