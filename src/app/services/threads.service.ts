import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { AllUserData } from '../../../shared/to/all-user-data';

@Injectable()
export class ThreadsService {

  constructor(private httpClient: HttpClient) { }

  loadUserThreads(userId:number): Observable<AllUserData> {

    const headers = new HttpHeaders({'USERID': userId.toString()});
    

    return this.httpClient.get<AllUserData>('/api/threads', {headers})
      .map(res =>res);
  }

}
