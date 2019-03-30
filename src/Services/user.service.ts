import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getUrl(uri = '') {
    return `${this.server}/${uri}`;
  }

  createParticipant(email_id: String, password: String) {
    const body = { email_id: email_id, password: password };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.getUrl('users/createUser'), body).pipe(map(res => res, { 'headers': headers }));
  }

  getAllParticipants() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.getUrl('users/All/')).pipe(map(res => res, { 'headers': headers }));
  }

  deleteParticipant(id: String) {
    const body = { id: id };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.getUrl('users/removeParticipant'), body).pipe(map(res => res, { 'headers': headers }));
  }
}
