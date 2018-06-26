import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFundsEditComponent } from './record-funds-edit.component';

describe('RecordFundsEditComponent', () => {
  let component: RecordFundsEditComponent;
  let fixture: ComponentFixture<RecordFundsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordFundsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFundsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
