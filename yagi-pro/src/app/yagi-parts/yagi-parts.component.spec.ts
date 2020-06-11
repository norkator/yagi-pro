import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YagiPartsComponent } from './yagi-parts.component';

describe('YagiPartsComponent', () => {
  let component: YagiPartsComponent;
  let fixture: ComponentFixture<YagiPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YagiPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YagiPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
