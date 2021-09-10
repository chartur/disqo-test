import {Component, OnDestroy, OnInit} from '@angular/core';
import {GistService} from "../../services/gist.service";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {Subscription} from "rxjs";
import * as moment from "moment";
import { extendMoment } from 'moment-range';
import {skipWhile, take} from "rxjs/operators";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  public gists: any[] = [];
  private publicGistsSubscription: Subscription;
  private loadMoreGistsSubscription: Subscription;

  public chartGists: any;
  public chartFiles: any;

  constructor(
    private gistService: GistService
  ) { }

  ngOnInit(): void {
    this.publicGistsSubscription = this.gistService.publicGistsStream$
      .pipe(
        skipWhile(val => val.length <= 0),
        take(1)
      )
      .subscribe(g => {
        this.gists = g;
        this.chartInit();
      });

    this.loadMoreGistsSubscription = this.gistService.loadMoteGistsStream$
      .subscribe(data => {

        this.gists = [
          ...this.gists,
          ...data
        ];

        const range = this.makeChartData(this.gists);

        this.chartGists.data = range;
        this.chartFiles.data = range;
      })
  }

  ngOnDestroy(): void {
    this.publicGistsSubscription.unsubscribe();
  }

  loadMorePublicGists() {
    this.gistService.loadMorePublicGists();
  }

  chartInit() {
    am4core.ready(() => {
      this.chartGists = am4core.create("chartgists", am4charts.XYChart);
      this.chartFiles = am4core.create("chartfiles", am4charts.XYChart);


      if(this.gists.length) {
        const range = this.makeChartData(this.gists);
        this.buildChart(this.chartGists, range, 'gists')
        this.buildChart(this.chartFiles, range, 'files')
      }
    });
  }

  private makeChartData(gists: any[]) {
    if(!gists.length) {
      return [];
    }

    const range = [];
    const rangeMoment = extendMoment(moment);

    const endDateTime = moment(gists[0].created_at);
    const startDateTime = moment(gists[gists.length - 1].created_at);
    if(startDateTime.seconds() % 5) {
      startDateTime.subtract(startDateTime.seconds() % 5, 'seconds');
    }

    const startEndRange = rangeMoment.range(startDateTime, endDateTime);

    let flagDate = startDateTime.clone();

    while (startEndRange.contains(flagDate)) {
      const item = {
        date: flagDate.format('yyyy-MM-DD HH:mm:ss'),
        gists: gists.filter(gist => {
          const d = moment(gist.created_at);
          const prevFiveSec = flagDate.clone().subtract(5, 'seconds');
          return rangeMoment.range(prevFiveSec, flagDate).contains(d);
        }).length,
        files: gists.filter(gist => {
          const d = moment(gist.created_at);
          const prevFiveSec = flagDate.clone().subtract(5, 'seconds');
          return rangeMoment.range(prevFiveSec, flagDate).contains(d);
        }).map(e => Object.keys(e.files).length).reduce((prev, next) => prev + next, 0)
      };

      range.push(item);
      flagDate.add(5, 'seconds');
    }

    return range;
  }

  private buildChart(chart: any, range: any[], key: string) {
    chart.data = range;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = key;
    series.dataFields.dateX = "date";
    series.tooltipText = "{"+ key +"}";
    series.strokeWidth = 1;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    const bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
  }
}
