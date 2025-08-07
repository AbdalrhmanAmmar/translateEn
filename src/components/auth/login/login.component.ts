import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, NgForm } from '@angular/forms';
import {
  SpinnerComponent,           // ← import the spinner
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TextColorDirective,
} from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import { EncryptionService } from '../../../core/services/helper-services/encryption.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/modules-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ContainerComponent,
    CommonModule,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    SpinnerComponent,       // ← add it here
    FormsModule,
  ],
})
export class LoginComponent {
  isLoading = false;         // ← loading flag

  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);
  private readonly _enc       = inject(EncryptionService);

  onFormSubmit(form: NgForm): void {
    if (!form.valid) return;

    this.isLoading = true;
    this.authService.loginUser(form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        // handle/display error here
      },
    });
  }
}
