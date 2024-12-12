import {
  AuthServiceImpl,
  AuthViewService,
  UrlServiceImpl,
  UrlViewService,
  setUiError
} from '@/infrastructure';
import { atom } from 'nanostores';

const authViewServiceAtom = atom<AuthViewService | null>(null);
const urlViewServiceAtom = atom<UrlViewService | null>(null);

export const initializeViewServices = () => {
  authViewServiceAtom.set(
    new AuthViewService(new AuthServiceImpl(), setUiError)
  );
  urlViewServiceAtom.set(new UrlViewService(new UrlServiceImpl(), setUiError));
};

export const getAuthViewService = () => {
  const instance = authViewServiceAtom.get();
  if (!instance) {
    throw new Error(
      "AuthViewService is not initialized. Call initializeViewServices() first."
    );
  }
  return instance;
};

export const getUrlViewService = () => {
  const instance = urlViewServiceAtom.get();
  if (!instance) {
    throw new Error(
      "UrlViewService is not initialized. Call initializeViewServices() first."
    );
  }
  return instance;
};

initializeViewServices();
