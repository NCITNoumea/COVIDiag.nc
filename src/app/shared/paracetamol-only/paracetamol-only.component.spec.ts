import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParacetamolOnlyComponent } from './paracetamol-only.component';

describe('ParacetamolOnlyComponent', () => {
  let component: ParacetamolOnlyComponent;
  let fixture: ComponentFixture<ParacetamolOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParacetamolOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParacetamolOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
