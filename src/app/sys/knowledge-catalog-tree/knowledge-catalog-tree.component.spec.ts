import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCatalogTreeComponent } from './knowledge-catalog-tree.component';

describe('KnowledgeCatalogTreeComponent', () => {
  let component: KnowledgeCatalogTreeComponent;
  let fixture: ComponentFixture<KnowledgeCatalogTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCatalogTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeCatalogTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
