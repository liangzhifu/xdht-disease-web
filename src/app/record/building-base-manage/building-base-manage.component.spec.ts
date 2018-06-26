import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingBaseManageComponent } from './building-base-manage.component';

describe('BuildingBaseManageComponent', () => {
  let component: BuildingBaseManageComponent;
  let fixture: ComponentFixture<BuildingBaseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBaseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBaseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
