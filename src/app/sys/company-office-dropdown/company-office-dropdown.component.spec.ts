import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficeDropdownComponent } from './company-office-dropdown.component';

describe('CompanyOfficeDropdownComponent', () => {
  let component: CompanyOfficeDropdownComponent;
  let fixture: ComponentFixture<CompanyOfficeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOfficeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfficeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
