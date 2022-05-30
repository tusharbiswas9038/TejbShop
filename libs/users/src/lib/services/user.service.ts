/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { User } from '../models/user';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(private http: HttpClient, private userFacade: UsersFacade) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

  initAppSession(){
    this.userFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.userFacade.currentUser$;
  }

  isCurrentUserAuth(){
    return this.userFacade.isAuthenticated$;
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
