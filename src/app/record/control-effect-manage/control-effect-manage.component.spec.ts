import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEffectManageComponent } from './control-effect-manage.component';

describe('ControlEffectManageComponent', () => {
  let component: ControlEffectManageComponent;
  let fixture: ComponentFixture<ControlEffectManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlEffectManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlEffectManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
