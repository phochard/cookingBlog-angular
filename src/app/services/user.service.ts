import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    new User('Will', 'will@will.com', 'Hello world',)
];
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

  getAllUsers(){
    this.httpClient
      .get(environment.apiUrl+"users")
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.emitUsers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}