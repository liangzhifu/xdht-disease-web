import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProtectiveEditComponent } from './other-protective-edit.component';

describe('OtherProtectiveEditComponent', () => {
  let component: OtherProtectiveEditComponent;
  let fixture: ComponentFixture<OtherProtectiveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherProtectiveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProtectiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
