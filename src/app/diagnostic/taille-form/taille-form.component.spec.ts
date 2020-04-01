import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailleFormComponent } from './taille-form.component';

describe('TailleFormComponent', () => {
  let component: TailleFormComponent;
  let fixture: ComponentFixture<TailleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
