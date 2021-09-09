import {Note} from "./note";

export interface Notepad {
  id?: string,
  title: string,
  notes: Note[]
}
