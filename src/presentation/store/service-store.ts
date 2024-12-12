// src/stores/viewServiceStore.ts
import { atom } from 'nanostores';

import { AuthServiceImpl, UrlServiceImpl } from '@/infrastructure';

import { AuthViewService } from '@/presentation/view-services/auth.view-service';
import { UrlViewService } from '@/presentation/view-services/url.view-service';

const authViewServiceAtom = atom<AuthViewService | null>(null);
const urlViewServiceAtom = atom<UrlViewService | null>(null);

export const initializeViewServices = () => {
  authViewServiceAtom.set(new AuthViewService(new AuthServiceImpl()));
  urlViewServiceAtom.set(new UrlViewService(new UrlServiceImpl()));
};

export const getAuthViewService = () => {
  const instance = authViewServiceAtom.get();
  if (!instance) {
    throw new Error('AuthViewService is not initialized. Call initializeViewServices() first.');
  }
  return instance;
};

export const getUrlViewService = () => {
  const instance = urlViewServiceAtom.get();
  if (!instance) {
    throw new Error('UrlViewService is not initialized. Call initializeViewServices() first.');
  }
  return instance;
};

initializeViewServices();