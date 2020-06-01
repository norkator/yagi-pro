import {Component, Input, OnInit} from '@angular/core';
import {YagiInterface} from "../interfaces";

@Component({
  selector: 'app-yagi-model',
  templateUrl: './yagi-model.component.html',
  styleUrls: ['./yagi-model.component.scss']
})
export class YagiModelComponent implements OnInit {

  @Input('yagi') public yagi = <YagiInterface>{};

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {

  }


  public getViewAspectWidth(elementWidth: number): number {
    return elementWidth * 3.7795275591 / 20;
  }

  public getElementDistanceMillis(position: number, distance: number): number {
    return distance === null ? position : distance;
  }

}
