import { HttpHeaders } from "@angular/common/http";

export function  commonHttpHeaders(userId: number) {
    const headers = new HttpHeaders({'USERID': userId.toString()});
    return {headers};
  }