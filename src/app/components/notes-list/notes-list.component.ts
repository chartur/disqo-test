import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../models/note";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  @Input('notes') notes: Note[] = [];
  @Output('onNoteDelete') onNoteDelete: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteNote(note: Note) {
    this.onNoteDelete.emit(note)
  }
}
