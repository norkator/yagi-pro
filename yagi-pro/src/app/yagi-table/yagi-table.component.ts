import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YagiInterface} from "../interfaces";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-yagi-table',
  templateUrl: './yagi-table.component.html',
  styleUrls: ['./yagi-table.component.scss']
})
export class YagiTableComponent implements OnInit {


  @Input('yagi') public yagi = <YagiInterface>{};
  @Input('changeTrigger') public changeTrigger;


  displayedColumns: string[] = ['Name', 'Number', 'Length', 'Position', 'Distance'];
  @ViewChild('table') table: MatTable<Element>;


  constructor() {
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes) {
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }


  public formatElementData(elementName: string, elementData: string): string {
    if (elementName === 'name' || elementName === 'number') {
      return elementData;
    } else {
      return elementData === null ? '' : elementData + ' mm';
    }
  }


}
