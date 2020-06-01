import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YagiInterface} from "../interfaces";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  // Input contract details for rendering
  @Input('yagi') public yagi = <YagiInterface>{};
  @Output('yagiChange') yagiChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public boomIsolationChange(event: MatRadioChange): void {
    console.log(event.value);
    this.yagiChange.emit(this.yagi);
  }

}
