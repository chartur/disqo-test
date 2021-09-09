import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotepadService} from "../../services/notepad.service";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  public notepadForm: FormGroup;

  constructor(
    private notepadService: NotepadService
  ) { }

  ngOnInit(): void {
    this.notepadForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255)
      ])
    })
  }

  saveNotepad(): void {
    const notepad = {
      ...this.notepadForm.value,
      notes: []
    };
    this.notepadService.createNotepad(notepad);
  }
}
