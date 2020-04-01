import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureFormComponent } from './temperature-form.component';

describe('TemperatureFormComponent', () => {
  let component: TemperatureFormComponent;
  let fixture: ComponentFixture<TemperatureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
