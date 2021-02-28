import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoadingComponent, MessagesComponent } from './shared.index';



@NgModule({
  declarations: [LoadingComponent, MessagesComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent, MessagesComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    };
  }
}
