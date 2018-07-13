import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceNoiseManageComponent } from './workplace-noise-manage.component';

describe('WorkplaceNoiseManageComponent', () => {
  let component: WorkplaceNoiseManageComponent;
  let fixture: ComponentFixture<WorkplaceNoiseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplaceNoiseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceNoiseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
