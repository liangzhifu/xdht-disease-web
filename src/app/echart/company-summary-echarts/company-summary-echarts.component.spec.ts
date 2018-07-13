import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySummaryEchartsComponent } from './company-summary-echarts.component';

describe('CompanySummaryEchartsComponent', () => {
  let component: CompanySummaryEchartsComponent;
  let fixture: ComponentFixture<CompanySummaryEchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySummaryEchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySummaryEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
