import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ReqResResponse, User } from 'src/app/models/';
import { GLOBAL } from '../global';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(term: string, sort = 'followers', order = 'desc', limit: number, page = 0): Observable<ReqResResponse> {
    if (!term) { return; }

    if (!limit) {
      limit = 15;
    }

    const paginate = `?q=${term}&sort=${sort}&order=${order}&per_page=${limit}&page=${page + 1}`;

    const query = GLOBAL.searchUrl + paginate;

    return this.http.get<ReqResResponse>(query)
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

  async getSingleUser(login: string): Promise<User> {
    if (!login) { return; }

    const query = GLOBAL.userUrl + login;

    try {
      return await this.http
        .get<any>(query)
        .toPromise()
        .then()
        .catch((error) => error);
    } catch (err) {
      throw new Error('Error HTTP ');
    }
  }

}
