import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthManagementManageComponent } from './health-management-manage.component';

describe('HealthManagementManageComponent', () => {
  let component: HealthManagementManageComponent;
  let fixture: ComponentFixture<HealthManagementManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthManagementManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthManagementManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
