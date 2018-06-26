import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAerationManageComponent } from './building-aeration-manage.component';

describe('BuildingAerationManageComponent', () => {
  let component: BuildingAerationManageComponent;
  let fixture: ComponentFixture<BuildingAerationManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingAerationManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAerationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
