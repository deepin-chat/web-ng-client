import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form?: FormGroup;
  isLoading = false;
  showPassword = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    });
  }
  onSubmit() {
    if (this.isLoading || this.form?.invalid) return;
    this.isLoading = true;
    this.authService.signIn(this.form?.value)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] ?? '/');
        },
        error: () => {

        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
