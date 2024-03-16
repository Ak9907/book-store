import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['books']);
      },
      error: () => {
        this.errorMessage = "Invalid Credentials"
        console.log('Login failed');
      }
    });
  }
}
