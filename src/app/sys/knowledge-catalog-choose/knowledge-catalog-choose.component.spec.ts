import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCatalogChooseComponent } from './knowledge-catalog-choose.component';

describe('KnowledgeCatalogChooseComponent', () => {
  let component: KnowledgeCatalogChooseComponent;
  let fixture: ComponentFixture<KnowledgeCatalogChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCatalogChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeCatalogChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
