import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = this.authService.currentUserValue;
        if(currentUser && currentUser.token){
            // request = request.clone({ headers: request.headers.set('authorization', currentUser.token ) });
            return next.handle(request);
        }else{

            return next.handle(request);
        }
  }
}