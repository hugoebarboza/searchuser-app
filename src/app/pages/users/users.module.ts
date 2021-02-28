import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ShortNumberPipe } from '../../pipes/short-number';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [UsersComponent, UserDetailComponent, ShortNumberPipe],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
