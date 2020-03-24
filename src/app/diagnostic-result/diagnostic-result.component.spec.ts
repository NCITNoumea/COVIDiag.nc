import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticResultComponent } from './diagnostic-result.component';

describe('DiagnosticResultComponent', () => {
  let component: DiagnosticResultComponent;
  let fixture: ComponentFixture<DiagnosticResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
