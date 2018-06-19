import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardFactorsEditComponent } from './hazard-factors-edit.component';

describe('HazardFactorsEditComponent', () => {
  let component: HazardFactorsEditComponent;
  let fixture: ComponentFixture<HazardFactorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardFactorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardFactorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
