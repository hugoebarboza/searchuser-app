import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ReqResResponse } from 'src/app/models/';
import { GLOBAL } from '../global';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getUser(term: string, sort = 'followers', order = 'desc', limit = 30, page = 0): Observable<ReqResResponse> {
    if (!term) { return; }

    const paginate = `?q=${term}&sort=${sort}&order=${order}&per_page=${limit}&page=${page + 1}`;

    const query = this.url + paginate;

    console.log(query);

    return this.http.get<ReqResResponse>(query, { headers: { Accept: 'application/vnd.github.v3+json' } })
      .pipe(
        shareReplay(),
        map(resp => {
          return resp;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

}
