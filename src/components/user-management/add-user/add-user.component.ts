import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  CardComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular-pro';
import {
  cilEnvelopeOpen,
  cilLockLocked,
  cilPen,
  cilPhone,
  cilSave,
  cilShieldAlt,
  cilUser,
} from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { IAddUser } from '../../../core/interfaces/iuser';
import { UsersService } from '../../../core/services/modules-services/users.service';
import { NotificationService } from '../../../core/services/helper-services/notification.service';

// Custom validator for password confirmation
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    RowComponent,
    ColComponent,
    FormModule,
    ButtonDirective,
    IconDirective,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);

  icons = {
    cilPen,
    cilUser,
    cilEnvelopeOpen,
    cilPhone,
    cilLockLocked,
    cilShieldAlt,
    cilSave,
  };

  form: FormGroup = this._FormBuilder.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: [null, [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...userData } = this.form.value;
    const user: IAddUser = userData;

    this._UsersService.addUser(user).subscribe({
      next: () => {
        NotificationService.fireNotification('تم إضافة المستخدم بنجاح');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error adding user:', err);
      },
    });
  }

  // Helper method to check if field has error
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.form.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    return field.invalid && (field.dirty || field.touched);
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) return `${fieldName} مطلوب`;
    if (errors['email']) return 'البريد الإلكتروني غير صحيح';
    if (errors['minlength']) return `الحد الأدنى ${errors['minlength'].requiredLength} أحرف`;
    if (errors['pattern']) return 'تنسيق غير صحيح';
    if (errors['passwordMismatch']) return 'كلمات المرور غير متطابقة';

    return 'خطأ في التحقق';
  }
}