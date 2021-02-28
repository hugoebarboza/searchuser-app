import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UsersService } from 'src/app/services/service.index';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() login: string;

  user: User;

  constructor(private usersService: UsersService) { }

  async ngOnInit(): Promise<void> {
    if (this.login) {
      this.user = await this.usersService.getSingleUser(this.login);
    }
  }

}
