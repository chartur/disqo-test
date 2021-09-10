import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNoteComponent } from './add-note/add-note.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddNoteComponent
  ],
  exports: [
    AddNoteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
