import { createAction, props } from '@ngrx/store';

export const setRegistrationForm = createAction(
  '[Registration] Set Registration Form',
  props<{ formData: any }>()
);

export const resetRegistrationForm = createAction('[Registration] Reset Registration Form');
