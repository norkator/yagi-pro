import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {YagiElementInterface, YagiInterface} from "../interfaces";

@Component({
  selector: 'app-yagi-model',
  templateUrl: './yagi-model.component.html',
  styleUrls: ['./yagi-model.component.scss']
})
export class YagiModelComponent implements OnInit {

  @Input('yagi') public yagi = <YagiInterface>{};

  constructor() {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
  }


  public getBoomLength(boomLength: number): number {
    return Math.floor(boomLength * 1000);
  }


  public getElementStyle(element: YagiElementInterface): any {
    return {
      'width': this.calculateWidthPercentage(element) + '%',
      'height': '10px',
      'background-color': '#a2a3a4'
    }
  }


  public getBoomStyle(element: YagiElementInterface): any {
    let h = (element.distance === null ? element.position : element.distance) / 2;
    if (h <= 0) {
      h = 40;
    }

    return {
      'width': '2%',
      'height': h + 'px',
      'background-color': '#c2c3c4'
    }
  }


  /**
   * Find longest, use longest as reference
   * to calculate suitable length for others
   * @param element Yagi elements
   */
  private calculateWidthPercentage(element: YagiElementInterface): number {
    const longest = this.yagi.yagiElements.reduce(function (previous, current) {
      return (previous.length > current.length) ? previous : current;
    }).length;

    // noinspection UnnecessaryLocalVariableJS
    const p = 100 - Math.floor(((longest - element.length) / ((longest + element.length) / 2)) * 100);
    // console.info(longest, element.length, p);

    return p;
  }


}
