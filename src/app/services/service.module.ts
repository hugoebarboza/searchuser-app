import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_BOOTSTRAP_LISTENER, ModuleWithProviders, NgModule } from '@angular/core';
import {
  LoadingService,
  MessagesService,
  SettingsService,
  UsersService
} from './service.index';


@NgModule({
  declarations: [],
  providers: [{
    provide: APP_BOOTSTRAP_LISTENER,
    multi: true,
    useFactory: () => () => { },
    deps: [UsersService]
  }],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ServicesModule,
      providers: [
        LoadingService,
        MessagesService,
        SettingsService,
        UsersService
      ]
    };
  }
}
