import { Component, OnInit } from '@angular/core';
import {NotepadService} from "../../services/notepad.service";
import {Subscription} from "rxjs";
import {Notepad} from "../../models/notepad";
import {Note} from "../../models/note";
import {AlertService} from "../../services/alert.service";

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
    private notepadService: NotepadService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.notepadDataSubscription = this.notepadService.notepadStream$
      .subscribe(this.createForm.bind(this));
  }

  saveNotepad(): void {
    try {
      this.notepadService.saveNotepad(this.notepadModel);
      this.alertService.success('Notepad successfully saved!')
    } catch (e) {
      this.alertService.somethingWrong();
    }
  }

  async addNewNote(note: Note) {
    this.notepadModel.notes.push(note);
    await this.notepadService.saveNotepad(this.notepadModel);
    this.alertService.success('Note successfully saved!')
  }

  async deleteNotepad() {
    if(!this.notepadModel.id) {
      return;
    }

    try {
      await this.notepadService.deleteNotepad(this.notepadModel.id);
      this.alertService.success('Notepad successfully deleted!')
    } catch (e) {
      this.alertService.somethingWrong();
    }
  }

  async deleteNote(note: Note) {
    this.notepadModel.notes = this.notepadModel.notes.filter(n => n.id !== note.id);
    await this.notepadService.saveNotepad(this.notepadModel);
    this.alertService.success('The note successfully deleted!')
  }

  private createForm(notepad: Notepad) {
    if(!notepad) {
      return;
    }
    this.notepadModel = notepad;
  }
}
