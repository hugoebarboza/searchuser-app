import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    data: {
      title: 'GitHub Users',
      subtitle: 'GitHub users list',
      descripcion: 'Users managment',
    },
  },
  {
    path: '**',
    redirectTo: 'notfound',
  }];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
      enableTracing: false,
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
