import {Component, OnInit} from '@angular/core';
import {YagiCalculator} from "./yagi-calculator";
import {YagiInterface} from "./interfaces";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)
export class AppComponent extends YagiCalculator implements OnInit {

  title = 'yagi-pro';
  public yagi = <YagiInterface>{
    frequency: 145,
    elements: 3,
    gain: 5.23,
    boomLength: 0.672,
    parasiticDiameter: 10,
    boomDiameter: 20,
    boomIsolated: true,
    yagiElements: []
  };


  ngOnInit(): void {
    // this.dimRest(this.yagi);
    this.yagiCalculate(this.yagi)
  }


  public reCalculateYagi(): void {
    this.yagiCalculate(this.yagi)
  }


}
