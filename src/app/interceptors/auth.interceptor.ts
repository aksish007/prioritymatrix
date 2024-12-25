import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap, catchError, throwError } from 'rxjs';
import { getAuth } from '@angular/fire/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = getAuth();
  
  if (!auth.currentUser) {
    console.warn('No current user found in Firebase Auth');
    return next(req);
  }

  return from(auth.currentUser.getIdToken(true)).pipe(
    switchMap(token => {
      console.log('Token obtained:', token ? 'yes' : 'no');
      
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      
      return next(clonedReq);
    }),
    catchError(error => {
      console.error('Auth interceptor error:', error);
      return throwError(() => error);
    })
  );
};
