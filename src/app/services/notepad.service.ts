import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {endpoints} from "../../environments/environment";
import {Notepad} from "../models/notepad";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotepadService {

  private _notepad: BehaviorSubject<Notepad> = new BehaviorSubject<Notepad>(null);

  public readonly notepadStream$ = this._notepad.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  createNotepad(notepad: Notepad) {
    const data = {
      description: notepad.title,
      public: true,
      files: {
        'notepad.json': {
          content: JSON.stringify(notepad)
        }
      }
    };

    return this.http.post(endpoints.createNotepad, data).toPromise()
  }
}
