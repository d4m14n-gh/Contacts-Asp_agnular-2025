import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginDto } from '../../dto/user-login-dto';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [MatIcon, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  loginForm: FormGroup;
  loginError?: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  fail(err: any) {
    console.log('Failed to sign in!');
    this.loginError = err.error || 'An error occurred during sign-in. Please try again.';
  }


  success() {
    console.log('Signed in!');
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const user = new UserLoginDto(this.loginForm.value.email, this.loginForm.value.password);
    this.auth.login(user).subscribe({
      next: () => {
        this.success(); 
      },
      error: (err) => {
        if (err.status === 401) {
          console.log('Invalid credentials');
        } else {
          console.log('Error occurred during sign-in:', err);  
        }
        this.fail(err);
      }
    });
    
  }
}
