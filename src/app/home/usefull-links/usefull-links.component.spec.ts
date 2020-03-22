import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefullLinksComponent } from './usefull-links.component';

describe('UsefullLinksComponent', () => {
  let component: UsefullLinksComponent;
  let fixture: ComponentFixture<UsefullLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefullLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefullLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
