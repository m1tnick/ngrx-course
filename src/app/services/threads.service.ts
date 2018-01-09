import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { AllUserData } from '../../../shared/to/all-user-data';

@Injectable()
export class ThreadsService {

  constructor(private httpClient: HttpClient) { }

  loadUserThreads(): Observable<AllUserData> {
    return this.httpClient.get<AllUserData>('/api/threads')
      .map(res =>res);
  }

}
