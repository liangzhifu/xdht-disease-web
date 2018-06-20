import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureProtectionManageComponent } from './temperature-protection-manage.component';

describe('TemperatureProtectionManageComponent', () => {
  let component: TemperatureProtectionManageComponent;
  let fixture: ComponentFixture<TemperatureProtectionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureProtectionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureProtectionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
