import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyFacilitiesManageComponent } from './emergency-facilities-manage.component';

describe('EmergencyFacilitiesManageComponent', () => {
  let component: EmergencyFacilitiesManageComponent;
  let fixture: ComponentFixture<EmergencyFacilitiesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyFacilitiesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyFacilitiesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
