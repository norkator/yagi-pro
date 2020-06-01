import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YagiTableComponent } from './yagi-table.component';

describe('YagiTableComponent', () => {
  let component: YagiTableComponent;
  let fixture: ComponentFixture<YagiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YagiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YagiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
