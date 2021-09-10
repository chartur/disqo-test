import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../models/note";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  @Output('onAdd') onAdd: EventEmitter<Note> = new EventEmitter<Note>();
  addNoteForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.addNoteForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      note: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000)
      ])
    })
  }

  addNote() {
    if(!this.addNoteForm.valid) {
      return;
    }

    const note = {
      id: new Date().valueOf(),
      ...this.addNoteForm.value
    };
    this.onAdd.emit(note);
    this.addNoteForm.reset();
  }

}
