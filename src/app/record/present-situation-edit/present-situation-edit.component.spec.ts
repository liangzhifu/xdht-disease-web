import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentSituationEditComponent } from './present-situation-edit.component';

describe('PresentSituationEditComponent', () => {
  let component: PresentSituationEditComponent;
  let fixture: ComponentFixture<PresentSituationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentSituationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentSituationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
