import {Component, Input, OnInit} from '@angular/core';
import {YagiInterface} from "../interfaces";

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  // Input contract details for rendering
  @Input('yagi') public yagi = <YagiInterface>{};

  constructor() { }

  ngOnInit(): void {
  }

  value = 'Clear me';

}
