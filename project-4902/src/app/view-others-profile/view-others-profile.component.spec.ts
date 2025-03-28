import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOthersProfileComponent } from './view-others-profile.component';

describe('ViewOthersProfileComponent', () => {
  let component: ViewOthersProfileComponent;
  let fixture: ComponentFixture<ViewOthersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOthersProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOthersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
