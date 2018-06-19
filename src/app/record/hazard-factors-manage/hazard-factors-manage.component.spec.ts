import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardFactorsManageComponent } from './hazard-factors-manage.component';

describe('HazardFactorsManageComponent', () => {
  let component: HazardFactorsManageComponent;
  let fixture: ComponentFixture<HazardFactorsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardFactorsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardFactorsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
