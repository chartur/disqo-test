import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNoteComponent } from './add-note/add-note.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NotesListComponent } from './notes-list/notes-list.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    AddNoteComponent,
    NotesListComponent,
    AlertComponent
  ],
  exports: [
    AddNoteComponent,
    NotesListComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
