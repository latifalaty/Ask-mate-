import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetquestionComponent } from './getquestion.component';

describe('GetquestionComponent', () => {
  let component: GetquestionComponent;
  let fixture: ComponentFixture<GetquestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetquestionComponent]
    });
    fixture = TestBed.createComponent(GetquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
