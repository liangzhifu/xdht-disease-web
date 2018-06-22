import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficeEditComponent } from './company-office-edit.component';

describe('CompanyOfficeEditComponent', () => {
  let component: CompanyOfficeEditComponent;
  let fixture: ComponentFixture<CompanyOfficeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOfficeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfficeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
