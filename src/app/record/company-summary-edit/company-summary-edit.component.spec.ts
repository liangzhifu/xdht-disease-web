import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySummaryEditComponent } from './company-summary-edit.component';

describe('CompanySummaryEditComponent', () => {
  let component: CompanySummaryEditComponent;
  let fixture: ComponentFixture<CompanySummaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySummaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySummaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
