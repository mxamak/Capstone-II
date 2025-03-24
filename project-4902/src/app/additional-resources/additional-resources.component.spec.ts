import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalResourcesComponent } from './additional-resources.component';

describe('AdditionalResourcesComponent', () => {
  let component: AdditionalResourcesComponent;
  let fixture: ComponentFixture<AdditionalResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
