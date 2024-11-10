import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-two-factor-authentication',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatError,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatInput,
    MatButton,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    NgForOf
  ],
  templateUrl: './two-factor-authentication.component.html',
  styleUrl: './two-factor-authentication.component.css'
})
export class TwoFactorAuthenticationComponent {
  code: string[] = ['', '', '', ''];
  codeValid: boolean = true;
  actualCode: number = 0;

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginService.twoFactor().subscribe(
      (response) => {
        this.actualCode = response;
      },
      (error) => {
        console.error('Failed to retrieve the actual code', error);
      }
    );
  }

  onInputChange(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 0 && index < 3) {
      // Automatically move to the next input if this one is filled
      const nextInput = document.querySelector<HTMLInputElement>(`input[name="code${index + 1}"]`);
      nextInput?.focus();
    } else if (input.value.length === 0 && index > 0) {
      // Move to the previous input if backspace is pressed and the field is empty
      const prevInput = document.querySelector<HTMLInputElement>(`input[name="code${index - 1}"]`);
      prevInput?.focus();
    }
  }

  verifyCode(): void {
    const fullCode = parseInt(this.code.join(''));
    if (fullCode === this.actualCode) {
      this.codeValid = true;
      this.router.navigate(['homepage']);
      localStorage.setItem('2FA', 'true');
    } else {
      this.router.navigate(['error']);
    }
  }
}
