import type { FormControl } from '@angular/forms';

/**
 * Used to determine wether the form control should display an error message
 *
 * @param control - the `FormControl`
 * @returns a `boolean`
 */
export const shouldShowErrorMessage = (control: FormControl): boolean => {
  return control.dirty && control.touched && control.invalid;
};
