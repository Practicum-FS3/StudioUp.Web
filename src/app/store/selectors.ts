import { createSelector } from '@ngrx/store';
import { State } from './reducer';

// Selector to get the registration form data from the state
export const selectRegistrationForm = createSelector(
  (state: State) => state.registrationForm,
  (formData) => formData
);
