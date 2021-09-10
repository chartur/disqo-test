import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNoteComponent } from './add-note/add-note.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NotesListComponent } from './notes-list/notes-list.component';



@NgModule({
  declarations: [
    AddNoteComponent,
    NotesListComponent
  ],
  exports: [
    AddNoteComponent,
    NotesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
