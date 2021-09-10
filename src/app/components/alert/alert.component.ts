import { Component, OnInit } from '@angular/core';
import {interval, Subscription} from "rxjs";
import {AlertService} from "../../services/alert.service";
import {Alert} from "../../models/alert";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alertSubscription: Subscription;
  alert: Alert;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alertStream$
      .subscribe((res: Alert) => {
        this.alert = res;
        interval(3000)
          .pipe(
            take(1)
          )
          .subscribe((_) => this.alert = null)
      })
  }

}
