import { TestBed, async } from '@angular/core/testing';
import { CovidiagAppComponent } from './covidiagnc-app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CovidiagAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CovidiagAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'covidiagnc'`, () => {
    const fixture = TestBed.createComponent(CovidiagAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('covidiagnc');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(CovidiagAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to covidiagnc!');
  });
});
