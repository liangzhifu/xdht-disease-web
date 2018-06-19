import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentLayoutEditComponent } from './equipment-layout-edit.component';

describe('EquipmentLayoutEditComponent', () => {
  let component: EquipmentLayoutEditComponent;
  let fixture: ComponentFixture<EquipmentLayoutEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentLayoutEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentLayoutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
