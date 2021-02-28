import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  subject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.subject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>, loadingtype?: boolean): Observable<T> {
    return of(null).pipe(
      tap(() => {
        this.loadingOn();
      }),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn(): void {
    this.subject.next(true);
  }

  loadingOff(): void {
    this.subject.next(false);
  }
}
