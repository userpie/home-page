import {Component, ChangeDetectionStrategy, signal, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  {code: 'nl', name: 'Nederlands', flag: environment.firstPath + '/assets/flags/belgium.svg'},
  {code: 'pt', name: 'Português', flag: environment.firstPath + '/assets/flags/brazil.svg'},
  {code: 'en', name: 'English', flag: environment.firstPath + '/assets/flags/jamaica.svg'}
];

export const defaultLanguage = languages[1]; // Portuguese

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class LanguageSwitcherComponent implements OnInit {
  private translate = inject(TranslateService);

  isOpen = signal(false);

  currentLanguage = signal<Language>(defaultLanguage);
  languages = signal<Language[]>(languages);

  ngOnInit(): void {
    const lang = this.translate.getCurrentLang();
    if (lang) {
      const language = languages.find(language => language.code === lang) || defaultLanguage;
      this.currentLanguage.set(language);
    }
  }

  toggleDropdown(): void {
    this.isOpen.update(open => !open);
  }

  selectLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.isOpen.set(false);
    this.translate.use(language.code);
    localStorage.setItem('lang', language.code);
  }

  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    const componentElement = target.closest('.language-switcher');

    // Close dropdown when clicking outside the component
    if (!componentElement && this.isOpen()) {
      this.isOpen.set(false);
    }
  }
}
