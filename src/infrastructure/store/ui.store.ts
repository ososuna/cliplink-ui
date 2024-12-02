import { atom, map } from 'nanostores';

export type UiError = {
  message: string;
  type: string;
}

export const uiError = map<UiError>({ message: '', type: '' });

export const setUiError = (error: UiError) => {
  uiError.set(error);
}