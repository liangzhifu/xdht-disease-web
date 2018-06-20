import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleChooseComponent } from './role-choose.component';

describe('RoleChooseComponent', () => {
  let component: RoleChooseComponent;
  let fixture: ComponentFixture<RoleChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
