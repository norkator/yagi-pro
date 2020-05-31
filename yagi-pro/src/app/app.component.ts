import {Component} from '@angular/core';
import {YagiCalculator} from "./yagi-calculator";
import {YagiInterface} from "./interfaces";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)
export class AppComponent extends YagiCalculator {

  title = 'yagi-pro';
  public yagi = <YagiInterface>{frequency: 800, elements: 22, parasiticDiameter: 10, boomDiameter: 20}

}
