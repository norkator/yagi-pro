import { Component } from '@angular/core';
import {YagiCalculator} from "./yagi-calculator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends YagiCalculator {
  title = 'yagi-pro';
}
