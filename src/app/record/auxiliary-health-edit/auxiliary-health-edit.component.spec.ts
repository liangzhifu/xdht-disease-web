import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliaryHealthEditComponent } from './auxiliary-health-edit.component';

describe('AuxiliaryHealthEditComponent', () => {
  let component: AuxiliaryHealthEditComponent;
  let fixture: ComponentFixture<AuxiliaryHealthEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliaryHealthEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliaryHealthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
