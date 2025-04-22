import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationCarouselComponent } from './formation-carousel.component';

describe('FormationCarouselComponent', () => {
  let component: FormationCarouselComponent;
  let fixture: ComponentFixture<FormationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
