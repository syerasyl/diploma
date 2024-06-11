import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../core/util/consts";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_URL + '/api/v1/user';

  messageService = inject(MessageService);
  private usernameSubject = new BehaviorSubject<string>(this.username);
  username$ = this.usernameSubject.asObservable();

  private roleSubject = new BehaviorSubject<string>(this.role);
  role$ = this.roleSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  set username (username: string) {
    localStorage.setItem('username', username);
    this.usernameSubject.next(username);
  }

  get username() {
    return localStorage.getItem('username') as string;
  }

  set role (role: string) {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  get role() {
    return localStorage.getItem('role') as string;

  }

  deleteCache() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.usernameSubject.next('');
    this.roleSubject.next('');
  }

  uploadAvatar(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.http.post(`${this.apiUrl}/avatar`, formData, { headers });
  }

  getAvatar(): Observable<Blob> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get(`${this.apiUrl}/avatar`, { headers, responseType: 'blob' });
  }


}
