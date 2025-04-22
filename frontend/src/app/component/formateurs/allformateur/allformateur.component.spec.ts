import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllformateurComponent } from './allformateur.component';

describe('AllformateurComponent', () => {
  let component: AllformateurComponent;
  let fixture: ComponentFixture<AllformateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllformateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
