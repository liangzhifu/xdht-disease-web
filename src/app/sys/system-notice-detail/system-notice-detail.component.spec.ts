import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNoticeDetailComponent } from './system-notice-detail.component';

describe('SystemNoticeDetailComponent', () => {
  let component: SystemNoticeDetailComponent;
  let fixture: ComponentFixture<SystemNoticeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNoticeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNoticeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
