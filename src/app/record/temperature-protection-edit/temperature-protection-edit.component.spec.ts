import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureProtectionEditComponent } from './temperature-protection-edit.component';

describe('TemperatureProtectionEditComponent', () => {
  let component: TemperatureProtectionEditComponent;
  let fixture: ComponentFixture<TemperatureProtectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureProtectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureProtectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
