import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProtectiveManageComponent } from './other-protective-manage.component';

describe('OtherProtectiveManageComponent', () => {
  let component: OtherProtectiveManageComponent;
  let fixture: ComponentFixture<OtherProtectiveManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherProtectiveManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProtectiveManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
