import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { AllUserData } from '../../../shared/to/all-user-data';
import { SendNewMessageActionPayload } from 'app/store/actions';
import { commonHttpHeaders } from 'app/services/commonHttpHeaders';

@Injectable()
export class ThreadsService {

  constructor(private httpClient: HttpClient) { }

  loadUserThreads(userId:number): Observable<AllUserData> {


    
    return this.httpClient.get<AllUserData>('/api/threads', commonHttpHeaders(userId))
      .map(res =>res);
  }


  saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {
    return this.httpClient.post(`/api/threads/${payload.threadId}`, 
      JSON.stringify({text: payload.text}),
      commonHttpHeaders(payload.participantId));
  }
}
