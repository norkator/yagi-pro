import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-yagi-parts',
  templateUrl: './yagi-parts.component.html',
  styleUrls: ['./yagi-parts.component.scss']
})
export class YagiPartsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public openUrl(url: string): void {
    window.open(url, "_blank");
  }


}
