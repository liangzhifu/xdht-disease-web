import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VddEquipmentManageComponent } from './vdd-equipment-manage.component';

describe('VddEquipmentManageComponent', () => {
  let component: VddEquipmentManageComponent;
  let fixture: ComponentFixture<VddEquipmentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VddEquipmentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VddEquipmentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
