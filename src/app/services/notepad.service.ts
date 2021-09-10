import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {endpoints} from "../../environments/environment";
import {Notepad} from "../models/notepad";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class NotepadService {

  private _notepad: BehaviorSubject<Notepad> = new BehaviorSubject<Notepad>(null);

  public readonly notepadStream$ = this._notepad.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.readLocalData();
  }

  saveNotepad(notepad: Notepad) {
    const data = {
      description: notepad.title,
      public: true,
      files: {
        'notepad.json': {
          content: JSON.stringify(notepad)
        }
      }
    };

    let request = notepad.id
      ? this.http.patch(endpoints.updateSingleGist.replace(':gistId', notepad.id), data)
      : this.http.post(endpoints.createNotepad, data);

    return request.pipe(
        tap((data: any) => {
          const savedNotepad = {...notepad, id: data.id};
          this.storageService.storeJsonItem('notepad', savedNotepad);
          this.storageService.setItem('gistId', savedNotepad.id)
          this._notepad.next(savedNotepad);
        })
      )
      .toPromise()
  }

  getGistById(gistId: string): Promise<Notepad> {
    return new Promise<Notepad>(async (resolve, reject) => {
      const url = endpoints.getSingleGist.replace(':gistId', gistId);
      try {
        let res: any = await this.http.get(url).toPromise();
        const notepad = JSON.parse(res.files['notepad.json'].content);
        notepad.id = res.id;
        this.storageService.storeJsonItem('notepad', notepad);
        this.storageService.setItem('gistId', notepad.id);
        return resolve(notepad)
      } catch (e) {
        return reject(e);
      }
    })
  }

  getFirstGistFromGistsList(): Promise<Notepad> {
    return new Promise<Notepad>(async (resolve, reject) => {
      const url = endpoints.getGists;
      try {
        const res: any = await this.http.get(url).toPromise();
        if(!res.length) {
          return resolve(null);
        }
        return resolve(await this.getGistById(res[0].id))
      } catch (e) {
        return reject(e)
      }
    })
  }

  deleteNotepad(notepadId: string) {
    return this.http.delete(endpoints.deleteSingleGist.replace(':gistId', notepadId))
      .pipe(
        tap(() => {
          this.storageService.destroyStorage();
          this._notepad.next({
            id: null,
            title: '',
            notes: []
          });
        })
      ).toPromise();
  }

  private readLocalData() {
    const notepad = this.storageService.getJsonItem<Notepad>('notepad')
    if(notepad) {
      return this._notepad.next(notepad)
    }

    const gistId = this.storageService.getItem('gistId');

    if(gistId) {
      return this.getGistById(gistId).then(notepad => this._notepad.next(notepad));
    }

    this.getFirstGistFromGistsList()
      .then(res => this._notepad.next(res));
  }
}
