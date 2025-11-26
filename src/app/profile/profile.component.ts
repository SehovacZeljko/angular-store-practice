import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';

interface UserMock {
  name: string;
  email: string;
  avatar: string | null;
}

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

 private fb = inject(FormBuilder);

  // --- Mock Signals for UI State ---
  // Mock user data to display in the profile fields
  user = signal<UserMock>({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'avatars/mock_path.jpg' // Mock path to show an existing avatar placeholder
  });

  loading = signal<boolean>(false); // Mock loading state
  activeTab = signal<'profile' | 'password' | 'danger'>('profile');
  previewUrl = signal<string | null>(null);
  toast = signal<{message: string, type: 'success' | 'error'} | null>(null);
  
  // --- Reactive Forms (Required for UI validation states) ---
  profileForm: FormGroup = this.fb.group({
    name: [this.user().name, [Validators.required, Validators.maxLength(255)]],
    email: [this.user().email, [Validators.required, Validators.email]],
    phone_number: ['555-1234', [Validators.maxLength(20)]],
    bio: ['Just a mockup user for UI testing. This bio section is for illustrative purposes only.', [Validators.maxLength(500)]],
    location: ['San Francisco, CA', [Validators.maxLength(255)]],
    // The pattern validator is added here to show UI error states immediately.
    website: ['not-a-valid-url', [Validators.maxLength(255), Validators.pattern('https?://.*')]], 
  });

  passwordForm: FormGroup = this.fb.group({
    current_password: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });

  deleteAccountForm: FormGroup = this.fb.group({
    password: ['', Validators.required]
  });
  
  // --- UI-only Actions/Helpers (These just log to console) ---

  onUpdateProfile() { console.log('Mock: Profile update triggered (no backend)'); }
  onUpdatePassword() { console.log('Mock: Password update triggered (no backend)'); }
  onDeleteAvatar() { 
      this.user.update(u => ({...u, avatar: null}));
      this.showToast('Mock: Avatar removed UI state.', 'success'); 
  }
  onDeleteAccount() { console.log('Mock: Delete Account triggered (no backend)'); }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Simulate preview creation using a placeholder
      this.previewUrl.set('https://placehold.co/96x96/6366f1/ffffff?text=NEW+PIC');
      this.showToast('Mock: File selected. Preview shown.', 'success');
    }
  }

  getAvatarUrl(path: string | null | undefined): string {
    if (!path) return `https://ui-avatars.com/api/?name=${this.user().name || 'User'}&color=7F9CF5&background=EBF4FF`;
    // Using a placeholder image for the mock path
    return `https://placehold.co/96x96/3b82f6/ffffff?text=Avatar`;
  }

  showToast(msg: string, type: 'success' | 'error') {
    this.toast.set({ message: msg, type });
    setTimeout(() => this.toast.set(null), 3000);
  }

  hasError(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    // Display error immediately for UI demonstration
    return !!(control && control.invalid && (control.dirty || control.touched || true));
  }

  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')?.value === g.get('password_confirmation')?.value
       ? null : { 'mismatch': true };
  }

}
