import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Message, ReqResResponse } from 'src/app/models';
import { LoadingService, MessagesService, SettingsService, UsersService } from '../../services/service.index';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columnslimit = [15, 30, 100];
  from = 0;
  isLoading = true;
  limit = 30;
  order = 'desc';
  page = 0;
  pageSize = 0;
  private searchTerms = new Subject<string>();
  sort = 'followers';
  title: string;
  term: string;
  to = this.limit;
  users: ReqResResponse;

  constructor(
    private label: SettingsService,
    public loadingService: LoadingService,
    private messages: MessagesService,
    private usersService: UsersService) {
    this.label.getDataRoute().subscribe((data) => {
      this.title = data.title;
    });
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((term: string) => {
        if (!term.trim()) {
          return;
        }
        this.initParams();
        this.getQuery();
      });
  }

  private initParams(): void {
    this.from = 0;
    this.limit = 30;
    this.to = this.limit;
    this.pageSize = 0;
    this.page = 0;
    if (this.users && this.users.items.length > 0) {
      this.users.total_count = 0;
      this.users.items = [];
    }
  }

  private getQuery(sort?: string, order?: string, limit?: number, page?: number): any {
    this.isLoading = true;

    const dataload$ = this.usersService.getUser(this.term, sort, order, limit, page)
      .pipe(
        untilDestroyed(this),
        tap((resp: any) => {
          if (resp) {
            this.users = resp;
            this.isLoading = !this.isLoading;
            const message: Message = { status: 'success', message: 'Success', code: 200 };
            this.messages.showSuccess(message);
          }
        }),
        catchError(async (err) => {
          this.initParams();
          this.isLoading = !this.isLoading;
          const message: Message = { status: 'error', message: err.error.message ? err.error.message : 'Http failure response', code: 401 };
          this.messages.showErrors(message);
        })
      );

    this.loadingService.showLoaderUntilCompleted(dataload$).subscribe();
  }

  onPaginateSortChange(sort: any): void {
    if (!sort) { return; }
    this.sort = sort;
    this.getQuery(this.sort, this.order, this.limit, this.page);
  }

  onPaginateChange(order: any): void {
    if (!order) { return; }
    this.order = order;
    this.getQuery(this.sort, this.order, this.limit, this.page);
  }

  paginate(value: number, increment: number): any {
    this.from = this.pageSize + value;
    this.to = this.to + value;

    if (this.from >= this.users.total_count) {
      return;
    }

    if (this.from < 0) {
      this.pageSize = 0;
      return;
    }

    this.pageSize += value;
    this.page += increment;

    this.getQuery(this.sort, this.order, this.limit, this.page);
  }

  search(term: string): any {
    if (!term) { return; }
    this.searchTerms.next(term);
  }

  trackByFn(item: any): any {
    if (!item) {
      return null;
    }
    return item.id;
  }

}
