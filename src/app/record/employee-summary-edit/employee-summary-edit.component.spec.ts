import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSummaryEditComponent } from './employee-summary-edit.component';

describe('EmployeeSummaryEditComponent', () => {
  let component: EmployeeSummaryEditComponent;
  let fixture: ComponentFixture<EmployeeSummaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSummaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSummaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
