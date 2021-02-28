import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/service.index';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  msg$: Observable<any[]>;
  showMessages = false;

  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
    this.msg$ = this.messagesService.msg$
      .pipe(
        tap((resp: any) => {
          if (resp && resp[0] && resp[0].code === 401) {
            this.showMessages = true;
          }
          if (resp && resp[0] && resp[0].code === 200) {
            this.showMessages = false;
          }
        })
      );
  }

  onClose(): void {
    this.showMessages = false;
  }

}
