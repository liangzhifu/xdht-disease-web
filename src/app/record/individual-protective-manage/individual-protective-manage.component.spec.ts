import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProtectiveManageComponent } from './individual-protective-manage.component';

describe('IndividualProtectiveManageComponent', () => {
  let component: IndividualProtectiveManageComponent;
  let fixture: ComponentFixture<IndividualProtectiveManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualProtectiveManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualProtectiveManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
