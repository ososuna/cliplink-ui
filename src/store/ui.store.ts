import { map } from 'nanostores';

export type UiError = {
  message: string;
  type: string;
}

export const uiError = map<UiError>({ message: '', type: '' });

export const setUiError = (error: UiError) => {
  if (error.message) {
    error.message = error.message.charAt(0).toUpperCase() + error.message.slice(1);
  }
  uiError.set(error);
}