import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YagiModelComponent } from './yagi-model.component';

describe('YagiModelComponent', () => {
  let component: YagiModelComponent;
  let fixture: ComponentFixture<YagiModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YagiModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YagiModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
