import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEcharsInfoComponent } from './employee-echars-info.component';

describe('EmployeeEcharsInfoComponent', () => {
  let component: EmployeeEcharsInfoComponent;
  let fixture: ComponentFixture<EmployeeEcharsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEcharsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEcharsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
