import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllparticipantComponent } from './allparticipant.component';

describe('AllparticipantComponent', () => {
  let component: AllparticipantComponent;
  let fixture: ComponentFixture<AllparticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllparticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
