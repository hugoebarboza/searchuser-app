import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private subject = new BehaviorSubject<Message[]>([]);

  readonly msg$: Observable<Message[]> = this.subject
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  showErrors(...errors: Message[]): void {
    this.subject.next(errors);
  }

  showSuccess(...success: Message[]): void {
    this.subject.next(success);
  }
}
