// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8080/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  sendMessage(userId:string ,messageText:string): Observable<any> {
    const message = {
      userId,
      messageText
    };
    return this.http.post<string>(`${this.baseUrl}/addChatMessage`, message );
  }


}
