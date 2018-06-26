import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAerationEditComponent } from './building-aeration-edit.component';

describe('BuildingAerationEditComponent', () => {
  let component: BuildingAerationEditComponent;
  let fixture: ComponentFixture<BuildingAerationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingAerationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAerationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
