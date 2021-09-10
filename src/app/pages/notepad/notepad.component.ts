import { Component, OnInit } from '@angular/core';
import {NotepadService} from "../../services/notepad.service";
import {Subscription} from "rxjs";
import {Notepad} from "../../models/notepad";
import {Note} from "../../models/note";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  public notepadDataSubscription: Subscription;
  public notepadModel: Notepad = {
    id: null,
    title: '',
    notes: []
  };

  constructor(
    private notepadService: NotepadService
  ) { }

  ngOnInit(): void {
    this.notepadDataSubscription = this.notepadService.notepadStream$
      .subscribe(this.createForm.bind(this));
  }

  saveNotepad(): void {
    this.notepadService.saveNotepad(this.notepadModel);
  }

  addNewNote(note: Note) {
    console.log(note);
  }

  async deleteNotepad() {
    if(!this.notepadModel.id) {
      return;
    }

    try {
      await this.notepadService.deleteNotepad(this.notepadModel.id)
    } catch (e) {
      console.error(e);
    }
  }

  private createForm(notepad: Notepad) {
    if(!notepad) {
      return;
    }
    this.notepadModel = notepad;
  }
}
