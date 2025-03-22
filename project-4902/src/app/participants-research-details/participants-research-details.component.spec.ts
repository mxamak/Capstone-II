import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsResearchDetailsComponent } from './participants-research-details.component';

describe('ParticipantsResearchDetailsComponent', () => {
  let component: ParticipantsResearchDetailsComponent;
  let fixture: ComponentFixture<ParticipantsResearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantsResearchDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsResearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
