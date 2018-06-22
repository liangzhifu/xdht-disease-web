import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySummaryManageComponent } from './company-summary-manage.component';

describe('CompanySummaryManageComponent', () => {
  let component: CompanySummaryManageComponent;
  let fixture: ComponentFixture<CompanySummaryManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySummaryManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySummaryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
