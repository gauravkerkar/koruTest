import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'details',
      component: DetailsComponent,
      data: {
        preload: true,
        delay: true
      },
    },
    {
      path: '',
      redirectTo: 'details',
      pathMatch: 'full',
    }
  ]
},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
