import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoidsFormComponent } from './poids-form.component';

describe('PoidsFormComponent', () => {
  let component: PoidsFormComponent;
  let fixture: ComponentFixture<PoidsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoidsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoidsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
