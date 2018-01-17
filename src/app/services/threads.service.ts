import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { AllUserData } from '../../../shared/to/all-user-data';
import { SendNewMessageActionPayload } from 'app/store/actions';
import { commonNewHttpHeaders, commonOldHttpHeaders } from 'app/services/commonHttpHeaders';
import {Http, Headers} from "@angular/http";
import { Message } from '../../../shared/model/message';


@Injectable()
export class ThreadsService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  loadUserThreads(userId:number): Observable<AllUserData> {


    
    return this.httpClient.get<AllUserData>('/api/threads', commonNewHttpHeaders(userId))
      .map(res =>res);
  }


  saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {
    // return this.httpClient.post(`/api/threads/${payload.threadId}`, 
    //   JSON.stringify({text: payload.text}),
    //   commonHttpHeaders(payload.participantId));


      return this.http.post(`/api/threads/${payload.threadId}`,
      JSON.stringify({text: payload.text}),
      commonOldHttpHeaders(payload.participantId));      
  }  


  loadNewMessagesForUser(): Observable<Message[]> {
    return null;
  }
}
