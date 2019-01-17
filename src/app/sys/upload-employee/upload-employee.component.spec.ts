import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEmployeeComponent } from './upload-employee.component';

describe('UploadEmployeeComponent', () => {
  let component: UploadEmployeeComponent;
  let fixture: ComponentFixture<UploadEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
