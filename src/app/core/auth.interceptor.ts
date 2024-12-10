import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserTokenStore } from '@services/user-token.store';

/**
 * Functional Auth Interceptor  
 * - It adds the authorization header to the request
 * @param req - The request to intercept
 * @param next - The next interceptor to call
 * @returns The intercepted request
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userTokenStore = inject(UserTokenStore);
  const token = userTokenStore.token();
  let authHeader = '';
  if (token) {
    authHeader = `Bearer ${token}`;
  }
  req = req.clone({ setHeaders: { Authorization: authHeader } });
  return next(req);
};
