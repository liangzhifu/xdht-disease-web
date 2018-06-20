import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyFacilitiesEditComponent } from './emergency-facilities-edit.component';

describe('EmergencyFacilitiesEditComponent', () => {
  let component: EmergencyFacilitiesEditComponent;
  let fixture: ComponentFixture<EmergencyFacilitiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyFacilitiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyFacilitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
