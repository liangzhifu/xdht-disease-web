import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VddEquipmentEditComponent } from './vdd-equipment-edit.component';

describe('VddEquipmentEditComponent', () => {
  let component: VddEquipmentEditComponent;
  let fixture: ComponentFixture<VddEquipmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VddEquipmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VddEquipmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
