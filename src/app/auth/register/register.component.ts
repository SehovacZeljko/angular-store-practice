import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    },
    { validators: this.passwordMatch }
  );

  error = '';
  loading = false;

  passwordMatch(g: any) {
    return g.get('password')?.value === g.get('password_confirmation')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { name, email, password, password_confirmation } = this.form.getRawValue();

    this.auth.register(name!, email!, password!, password_confirmation!).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = err.error?.message || 'Registration failed';
        this.loading = false;
      },
    });
  }
}