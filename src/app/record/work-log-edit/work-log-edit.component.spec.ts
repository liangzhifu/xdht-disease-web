import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogEditComponent } from './work-log-edit.component';

describe('WorkLogEditComponent', () => {
  let component: WorkLogEditComponent;
  let fixture: ComponentFixture<WorkLogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
