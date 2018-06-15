import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEffectEditComponent } from './control-effect-edit.component';

describe('ControlEffectEditComponent', () => {
  let component: ControlEffectEditComponent;
  let fixture: ComponentFixture<ControlEffectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlEffectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlEffectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
