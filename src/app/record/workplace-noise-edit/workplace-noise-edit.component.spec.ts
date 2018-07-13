import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceNoiseEditComponent } from './workplace-noise-edit.component';

describe('WorkplaceNoiseEditComponent', () => {
  let component: WorkplaceNoiseEditComponent;
  let fixture: ComponentFixture<WorkplaceNoiseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplaceNoiseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceNoiseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
