import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iusers } from '../components/users-list/users-list.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUser = `${environment.baseURL}`;
  headers = new HttpHeaders();


  constructor(private http: HttpClient) {
    this.headers.append('content-type', 'application/json')
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getAllUsers(): Observable<Iusers[]> {
    return this.http.get<Iusers[]>(`${this.apiUser}/users`, { headers: this.headers });
  }
  // deleteUser(userId: number) {
  //   return this.http.delete(`${this.apiUser}/user/${userId}`, { headers: this.headers });
  // }
}
