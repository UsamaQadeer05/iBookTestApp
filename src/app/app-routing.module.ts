import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from 'src/views/home/home.component';
import { SentPageViewComponent } from 'src/views/sentPage/sentPage.component';

const routes: Routes = [
  { path: 'sentPage', component: SentPageViewComponent },
  { path: 'home', component: HomeViewComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }