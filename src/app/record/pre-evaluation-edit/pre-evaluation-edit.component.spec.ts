import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEvaluationEditComponent } from './pre-evaluation-edit.component';

describe('PreEvaluationEditComponent', () => {
  let component: PreEvaluationEditComponent;
  let fixture: ComponentFixture<PreEvaluationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreEvaluationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEvaluationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
