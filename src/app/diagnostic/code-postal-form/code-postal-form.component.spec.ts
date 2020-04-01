import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePostalFormComponent } from './code-postal-form.component';

describe('CodePostalFormComponent', () => {
  let component: CodePostalFormComponent;
  let fixture: ComponentFixture<CodePostalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodePostalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePostalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
