import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  constructor(
    private httpClient : HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {

    if (localStorage.currentUser) {
      localStorage.clear();
    }
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);

    return this.httpClient.post<any>(`${environment.apiUrl}login`, body)
      .pipe(map(user => {
        if (user.status == "error") {
          console.log(user.message)
          this.currentUserSubject.next(null);

        } else {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

        }
        return user;

      }))
  }
}