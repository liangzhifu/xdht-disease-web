import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualNoiseEchartsComponent } from './individual-noise-echarts.component';

describe('IndividualNoiseEchartsComponent', () => {
  let component: IndividualNoiseEchartsComponent;
  let fixture: ComponentFixture<IndividualNoiseEchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualNoiseEchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualNoiseEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
