import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchCreationComponent } from './research-creation.component';

describe('ResearchCreationComponent', () => {
  let component: ResearchCreationComponent;
  let fixture: ComponentFixture<ResearchCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
