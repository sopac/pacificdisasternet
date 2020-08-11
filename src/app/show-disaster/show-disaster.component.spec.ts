import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDisasterComponent } from './show-disaster.component';

describe('ShowDisasterComponent', () => {
  let component: ShowDisasterComponent;
  let fixture: ComponentFixture<ShowDisasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDisasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDisasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
