import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTeamsComponent } from './administration-teams.component';

describe('AdministrationTeamsComponent', () => {
  let component: AdministrationTeamsComponent;
  let fixture: ComponentFixture<AdministrationTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
