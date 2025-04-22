import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormaComponent } from './select-forma.component';

describe('SelectFormaComponent', () => {
  let component: SelectFormaComponent;
  let fixture: ComponentFixture<SelectFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
