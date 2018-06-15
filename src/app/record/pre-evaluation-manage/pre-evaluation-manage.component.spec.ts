import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEvaluationManageComponent } from './pre-evaluation-manage.component';

describe('PreEvaluationManageComponent', () => {
  let component: PreEvaluationManageComponent;
  let fixture: ComponentFixture<PreEvaluationManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreEvaluationManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEvaluationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
