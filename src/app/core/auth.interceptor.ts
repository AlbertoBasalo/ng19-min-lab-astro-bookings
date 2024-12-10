import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@services/auth.store';


/**
 * Functional Auth Interceptor  
 * - It adds the authorization header to the request
 * @param req - The request to intercept
 * @param next - The next interceptor to call
 * @returns The intercepted request
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const token: string = authStore.selectToken();
  const newReq = req.clone({
    setHeaders: { Authorization: 'Bearer ' + token },
  });
  return next(newReq);
};
