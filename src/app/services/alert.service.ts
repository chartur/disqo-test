import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Alert} from "../models/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _alert: Subject<Alert> = new Subject<Alert>();

  readonly alertStream$ = this._alert.asObservable();

  success(message: string) {
    this._alert.next({
      status: true,
      message
    })
  }

  error(message: string) {
    this._alert.next({
      status: false,
      message
    })
  }

  somethingWrong() {
    this._alert.next({
      status: false,
      message: 'Something was wrong!'
    })
  }
}
