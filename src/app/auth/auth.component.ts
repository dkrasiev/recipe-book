import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertPlaceholder: PlaceholderDirective;
  closeSub: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSub) this.closeSub.unsubscribe();
  }

  onGoogleAuth() {
    this.authService.googleAuth();
  }

  onHandleError() {
    this.error = null;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      throw new Error('Form is invalid');
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.emailLogin(email, password);
    } else {
      authObservable = this.authService.emailSignup(email, password);
    }

    authObservable.subscribe({
      next: () => {
        const user = this.authService.user.pipe(take(1)).subscribe();

        if (user) {
          this.router.navigate(['/recipes']);
        }

        this.isLoading = false;
      },
      error: (e) => {
        this.error = e.message;
        this.showError(e.message);
        this.isLoading = false;
      },
    });
  }

  showError(message: string) {
    this.alertPlaceholder.viewContainerRef.clear();
    const alertRef =
      this.alertPlaceholder.viewContainerRef.createComponent(AlertComponent);

    alertRef.instance.message = message;
    this.closeSub = alertRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertPlaceholder.viewContainerRef.clear();
    });
  }
}
