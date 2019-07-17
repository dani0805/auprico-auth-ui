import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionedInputComponent } from './versioned-input.component';

describe('VersionedInputComponent', () => {
  let component: VersionedInputComponent;
  let fixture: ComponentFixture<VersionedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
