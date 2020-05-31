import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YagiInterface} from "../interfaces";

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  // Input contract details for rendering
  @Input('yagi') public yagi = <YagiInterface>{};

  boomIsolation: string = '1';

  constructor() {
  }

  ngOnInit(): void {
  }

  public boomIsolationChange(): void {
    console.log(this.boomIsolation);
    this.yagi.boomIsolated = this.boomIsolation === '1';
  }

}
