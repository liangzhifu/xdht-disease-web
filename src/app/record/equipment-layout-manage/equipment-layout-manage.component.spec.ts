import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentLayoutManageComponent } from './equipment-layout-manage.component';

describe('EquipmentLayoutManageComponent', () => {
  let component: EquipmentLayoutManageComponent;
  let fixture: ComponentFixture<EquipmentLayoutManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentLayoutManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentLayoutManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
