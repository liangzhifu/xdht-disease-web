import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPostPersonelComponent } from './record-post-personel.component';

describe('RecordPostPersonelComponent', () => {
  let component: RecordPostPersonelComponent;
  let fixture: ComponentFixture<RecordPostPersonelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordPostPersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPostPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
