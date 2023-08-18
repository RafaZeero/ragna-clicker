import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import type { FormControl } from '@angular/forms';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import { BehaviorSubject } from 'rxjs';
import { FormErrorComponent } from '../form-error';
import { IconComponent } from '../icon';
import { PasswordFieldComponent } from '../password-input';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { UserService } from '@shared/services';
import { shouldShowErrorMessage } from '@shared/utils';
import { ALERT_MESSAGES, ERROR_MESSAGES } from '@shared/constants';

@Component({
  selector: 'rag-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormErrorComponent,
    IconComponent,
    PasswordFieldComponent,
    GoogleSigninButtonModule,
    // IsControlRequiredPipe,
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  // * Dependency Injection
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _oauthService = inject(SocialAuthService);
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  // * Streams
  private readonly _showAlertMessage$ = new BehaviorSubject<boolean>(false);
  public readonly showAlertMessage$ = this._showAlertMessage$.asObservable();

  // * Form
  public readonly signupForm = this._fb.group({
    email: this._fb.control('', { validators: [Validators.required, Validators.email] }),
    name: this._fb.control('', { validators: [Validators.required, Validators.email] }),
    password: this._fb.control('', { validators: [Validators.required] }),
  });

  // * Utils
  public readonly shouldShowError = shouldShowErrorMessage;
  public readonly alertMessages = ALERT_MESSAGES;
  public readonly errorMessages = ERROR_MESSAGES;

  public user!: SocialUser;
  public loggedIn!: boolean;

  public ngOnInit(): void {
    /** Reset Error */
    this._showAlertMessage$.next(false);

    this._oauthService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;

      if (this.loggedIn) {
        this._userService.user = user.name;
        localStorage.setItem('userLogged', user.name);
        this._router.navigateByUrl('/play');
      }
    });
  }

  // * Actions
  public async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }

    const data = {
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
    };

    try {
      // * Login in auth service
      // * Remove error if any
      // * Redirect user to '/play'
    } catch (error: unknown) {
      // * This will trigger a request error message

      this._cd.markForCheck();
      for (const control of Object.values(this.signupForm.controls)) {
        control.markAsTouched();
        control.markAsDirty();
      }
    }
  }

  // * Helpers

  /**
   * This function will get a specific alert message to be displayed in the
   * alert component when checking the form control errors
   *
   * @returns a string with the alert message
   */
  public getAlertMessage(): string {
    /**
     * Check if control is dirty, touched, invalid and has a `required`
     * validation error
     */
    const isControlRequired = (control: FormControl): boolean =>
      shouldShowErrorMessage(control) && control.errors?.['required'] === true;

    /**
     * Check if control is dirty, touched, invalid and has a `email` validation
     * error
     */
    const hasControlInvalidEmail = (control: FormControl): boolean =>
      shouldShowErrorMessage(control) && control.errors?.['email'] === true;

    return pipe(
      this.signupForm.controls,
      O.fromNullable,

      /**
       * If email and password controls are invalid returns all fields alert
       * message
       */
      O.chain(
        flow(
          // * Check if all controls has error {required  = true}
          O.fromPredicate(({ email, password }) => isControlRequired(email) && isControlRequired(password)),
          // * Message for all fields required
          O.map(() => this.alertMessages.allFields),
        ),
      ),

      /** If only email control is invalid returns email field alert message */
      O.alt(() =>
        this.checkControlThen(
          this.signupForm.controls,
          // * Check if email control has error {required  = true}
          ({ email }) => isControlRequired(email),
          // * Message for required email
          this.alertMessages.email.required,
        ),
      ),

      O.alt(() =>
        pipe(
          this.signupForm.controls,
          O.fromNullable,
          O.chain(
            flow(
              // * Check if email control has error {email  = true}
              O.fromPredicate(({ email }) => hasControlInvalidEmail(email)),
              // * Message for invalid email format
              O.map(() => this.alertMessages.email.invalidEmail),
            ),
          ),
        ),
      ),

      /**
       * If only password control is invalid returns password field alert
       * message
       */
      O.alt(() =>
        pipe(
          this.signupForm.controls,
          O.fromNullable,
          O.chain(
            flow(
              // * Check if password control has error {required  = true}
              O.fromPredicate(({ password }) => isControlRequired(password)),
              // * Message for required password
              O.map(() => this.alertMessages.password.required),
            ),
          ),
        ),
      ),

      /** If request fails */
      O.alt(() =>
        pipe(
          this.alertMessages.request,
          // * Check if request failed
          O.fromPredicate(request => request.hasError),
          // * Message for request failed
          O.map(request => request.loginMessage),
        ),
      ),

      /** If has no errors, then no message should appear */
      O.getOrElse(() => this.alertMessages.noError),
    );
  }

  // * Form Error Handling /
  public isRequiredEmailError = (): boolean =>
    shouldShowErrorMessage(this.signupForm.controls.email) &&
    (this.signupForm.controls.email.errors?.['required'] as boolean);

  public isInvalidEmailError = (): boolean =>
    shouldShowErrorMessage(this.signupForm.controls.email) &&
    (this.signupForm.controls.email.errors?.['email'] as boolean);

  public isRequiredPasswordError = (): boolean =>
    shouldShowErrorMessage(this.signupForm.controls.password) &&
    (this.signupForm.controls.password.errors?.['required'] as boolean);

  public hasError = (): boolean =>
    shouldShowErrorMessage(this.signupForm.controls.email) || shouldShowErrorMessage(this.signupForm.controls.password);

  private checkControlThen<T extends Record<string, FormControl<unknown>>>(
    valueToBeChecked: T,
    predicate: (value: T) => boolean,
    emitsIfValid: string,
  ) {
    return pipe(
      valueToBeChecked,
      O.fromNullable,
      O.chain(
        flow(
          // * Check if email control has error {required  = true}
          O.fromPredicate(predicate),
          // * Message for required email
          O.map(() => emitsIfValid),
        ),
      ),
    );
  }
}
