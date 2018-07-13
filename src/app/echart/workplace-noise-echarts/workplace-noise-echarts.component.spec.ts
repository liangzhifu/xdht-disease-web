import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceNoiseEchartsComponent } from './workplace-noise-echarts.component';

describe('WorkplaceNoiseEchartsComponent', () => {
  let component: WorkplaceNoiseEchartsComponent;
  let fixture: ComponentFixture<WorkplaceNoiseEchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplaceNoiseEchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceNoiseEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
