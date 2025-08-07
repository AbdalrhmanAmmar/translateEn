import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule, ButtonDirective } from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import { LanguageService, Language } from '../../../core/services/helper-services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    ButtonDirective,
    IconDirective
  ],
  template: `
    <div class="language-switcher">
      <c-dropdown alignment="end" variant="nav-item">
        <button 
          [caret]="false" 
          cDropdownToggle 
          class="language-toggle-btn"
          aria-label="Switch language"
        >
          <div class="language-display">
            <span class="flag">{{ currentLang().flag }}</span>
            <span class="lang-code">{{ currentLang().code.toUpperCase() }}</span>
          </div>
        </button>
        
        <div cDropdownMenu class="language-menu">
          <h6 class="dropdown-header">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            Language / اللغة
          </h6>
          
          @for (language of languages; track language.code) {
            <button
              cDropdownItem
              class="language-option"
              [class.active]="currentLang().code === language.code"
              (click)="switchLanguage(language.code)"
            >
              <div class="language-item">
                <span class="flag">{{ language.flag }}</span>
                <span class="name">{{ language.name }}</span>
                @if (currentLang().code === language.code) {
                  <svg class="check-icon ms-auto" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                }
              </div>
            </button>
          }
        </div>
      </c-dropdown>
    </div>
  `,
  styles: [`
    .language-switcher {
      position: relative;
    }

    .language-toggle-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      padding: 8px 16px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .language-toggle-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
    }

    .language-display {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      font-weight: 600;
    }

    .flag {
      font-size: 18px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
    }

    .lang-code {
      font-size: 12px;
      letter-spacing: 0.5px;
    }

    .language-menu {
      min-width: 200px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      padding: 8px;
      background: white;
    }

    .dropdown-header {
      color: #6b7280;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 12px 16px 8px;
      border-bottom: 1px solid #f3f4f6;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
    }

    .language-option {
      border: none;
      border-radius: 8px;
      margin: 2px 0;
      padding: 0;
      background: transparent;
      transition: all 0.2s ease;
    }

    .language-option:hover {
      background: #f8fafc;
      transform: translateX(4px);
    }

    .language-option.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .language-option.active:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    }

    .language-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      width: 100%;
    }

    .language-item .flag {
      font-size: 20px;
    }

    .language-item .name {
      font-weight: 500;
      flex: 1;
    }

    .check-icon {
      color: #10b981;
      opacity: 0.8;
    }

    .language-option.active .check-icon {
      color: white;
    }

    /* RTL Support */
    [dir="rtl"] .language-option:hover {
      transform: translateX(-4px);
    }

    [dir="rtl"] .language-item {
      text-align: right;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .language-menu {
        background: #1f2937;
        border: 1px solid #374151;
      }
      
      .dropdown-header {
        color: #9ca3af;
        border-bottom-color: #374151;
      }
      
      .language-option:hover {
        background: #374151;
      }
    }
  `]
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);

  readonly languages = this.languageService.languages;
  readonly currentLang = this.languageService.currentLanguage;

  switchLanguage(code: string): void {
    this.languageService.switchLanguage(code);
  }
}