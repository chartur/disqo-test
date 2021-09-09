import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotepadComponent} from "./pages/notepad/notepad.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    component: NotepadComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
