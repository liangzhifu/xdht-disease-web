import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSummaryManageComponent } from './employee-summary-manage.component';

describe('EmployeeSummaryManageComponent', () => {
  let component: EmployeeSummaryManageComponent;
  let fixture: ComponentFixture<EmployeeSummaryManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSummaryManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSummaryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
