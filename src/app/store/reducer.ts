import { createReducer, on } from '@ngrx/store';
import { setRegistrationForm, resetRegistrationForm } from './actions';

export interface State {
  registrationForm: any | null;
}

export const initialState: State = {
  registrationForm: null,
};

export const registrationReducer = createReducer(
  initialState,
  on(setRegistrationForm, (state, { formData }) => ({
    ...state,
    registrationForm: formData,
  })),
  on(resetRegistrationForm, (state) => ({
    ...state,
    registrationForm: null,
  }))
);
