import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserLoginDto, UserRegisterDto } from '../../dto/user-login-dto';

@Component({
  selector: 'app-signup',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;
  registerError?: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  fail(err: any) {
    console.log('Failed to sign up!');
    this.registerError = err.error?.[0].description || 'An error occurred during sign-up. Please try again.';
  }

  success() {
    console.log('Signed up!');
    this.router.navigate(['']);
    this.auth.login(new UserLoginDto(this.registerForm.value.email, this.registerForm.value.password)).subscribe({
      next: () => {
        console.log('Logged in after sign up!');
      },
      error: (err) => {
        console.log('Error occurred during login:', err);
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) 
      return;
    
    const user = new UserRegisterDto(
      this.registerForm.value.email, 
      this.registerForm.value.password, 
    );
    console.log('Registering user:', user);

    this.auth.register(user).subscribe({
      next: () => {
        this.success(); 
      },
      error: (err) => {
        console.log('Error occurred during sign-up:', err);  
        this.fail(err);
      }
    });
  }
}
