import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotepadComponent} from "./pages/notepad/notepad.component";

const routes: Routes = [
  {
    path: '',
    component: NotepadComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
