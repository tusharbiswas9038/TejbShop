import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';


export const buildUserSession = createAction('[Users] build user session');



export const buildUserSessionSuccess = createAction(
  '[Users] build user session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailed = createAction('[Users] build user session Failed');
