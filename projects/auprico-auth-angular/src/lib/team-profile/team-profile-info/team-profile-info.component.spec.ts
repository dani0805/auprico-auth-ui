import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProfileInfoComponent } from './team-profile-info.component';

describe('TeamProfileContactsComponent', () => {
  let component: TeamProfileInfoComponent;
  let fixture: ComponentFixture<TeamProfileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamProfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
