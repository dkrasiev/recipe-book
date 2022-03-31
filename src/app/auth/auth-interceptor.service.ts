import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().append('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );

    // return this.authService.user.subscribe().pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       params: new HttpParams().append('auth', user.token),
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );
  }
}
