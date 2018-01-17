import { HttpHeaders } from "@angular/common/http";
import { Headers } from "@angular/http";

export function  commonNewHttpHeaders(userId: number) {
    const headers = new HttpHeaders({'USERID': userId.toString(), 'Content-Type': 'application/json; charset=utf-8'});
    return {headers};
  }

  export function commonOldHttpHeaders(userId: number) {
    const headers = new Headers();
    headers.append('USERID',userId.toString());
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return {headers};
}  