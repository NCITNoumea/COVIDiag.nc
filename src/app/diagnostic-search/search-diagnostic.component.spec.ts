import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDiagnosticComponent } from './search-diagnostic.component';

describe('SearchDiagnosticComponent', () => {
  let component: SearchDiagnosticComponent;
  let fixture: ComponentFixture<SearchDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
