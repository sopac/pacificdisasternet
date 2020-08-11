import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExpertComponent } from './show-expert.component';

describe('ShowExpertComponent', () => {
  let component: ShowExpertComponent;
  let fixture: ComponentFixture<ShowExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowExpertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
