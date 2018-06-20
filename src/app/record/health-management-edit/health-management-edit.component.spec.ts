import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthManagementEditComponent } from './health-management-edit.component';

describe('HealthManagementEditComponent', () => {
  let component: HealthManagementEditComponent;
  let fixture: ComponentFixture<HealthManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
