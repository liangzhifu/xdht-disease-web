import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpoiyeeInfoComponent } from './empoiyee-info.component';

describe('EmpoiyeeInfoComponent', () => {
  let component: EmpoiyeeInfoComponent;
  let fixture: ComponentFixture<EmpoiyeeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpoiyeeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpoiyeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
