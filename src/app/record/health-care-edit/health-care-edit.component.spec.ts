import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCareEditComponent } from './health-care-edit.component';

describe('HealthCareEditComponent', () => {
  let component: HealthCareEditComponent;
  let fixture: ComponentFixture<HealthCareEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCareEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
