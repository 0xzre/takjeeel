import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakjilFormComponent } from './takjil-form.component';

describe('TakjilFormComponent', () => {
  let component: TakjilFormComponent;
  let fixture: ComponentFixture<TakjilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakjilFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakjilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
