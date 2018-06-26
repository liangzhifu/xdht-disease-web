import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingBaseEditComponent } from './building-base-edit.component';

describe('BuildingBaseEditComponent', () => {
  let component: BuildingBaseEditComponent;
  let fixture: ComponentFixture<BuildingBaseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBaseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBaseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
