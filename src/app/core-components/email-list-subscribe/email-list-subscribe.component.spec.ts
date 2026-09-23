import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { EmailListSubscribeComponent } from './email-list-subscribe.component';
import {
  EmailListSubscribeService,
  EmailSubscriptionStatus
} from './email-list-subscribe.service';

describe('EmailListSubscribeComponent', () => {
  let component: EmailListSubscribeComponent;
  let fixture: ComponentFixture<EmailListSubscribeComponent>;
  let submittedStatus: BehaviorSubject<EmailSubscriptionStatus>;
  let emailListSubscribeService: jasmine.SpyObj<EmailListSubscribeService>;

  beforeEach(() => {
    submittedStatus = new BehaviorSubject<EmailSubscriptionStatus>(undefined);
    emailListSubscribeService = jasmine.createSpyObj<EmailListSubscribeService>(
      'EmailListSubscribeService',
      ['checkEmailValid', 'submitSubscriberEmail'],
      { submittedStatus }
    );
    emailListSubscribeService.checkEmailValid.and.callFake(email => {
      return email?.includes('@') ? undefined : 'Please enter a valid email address.';
    });
    emailListSubscribeService.submitSubscriberEmail.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EmailListSubscribeComponent],
      providers: [
        { provide: EmailListSubscribeService, useValue: emailListSubscribeService }
      ]
    });

    fixture = TestBed.createComponent(EmailListSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reset stale submission status for a new component instance', () => {
    submittedStatus.next('success');
    fixture.destroy();

    const newFixture = TestBed.createComponent(EmailListSubscribeComponent);
    newFixture.detectChanges();

    expect(submittedStatus.value).toBeUndefined();
    expect(newFixture.nativeElement.querySelector('form')).not.toBeNull();
    newFixture.destroy();
  });

  it('should block blank and invalid email addresses', () => {
    component.subscriberEmail = 'not-an-email';
    component.submitSubscriber();

    expect(emailListSubscribeService.submitSubscriberEmail).not.toHaveBeenCalled();
    expect(component.invalidEmailMessage).toContain('valid email');
  });

  it('should trim and submit a valid email address', () => {
    component.subscriberEmail = ' person@example.com ';

    component.submitSubscriber();

    expect(component.subscriberEmail).toBe('person@example.com');
    expect(emailListSubscribeService.submitSubscriberEmail).toHaveBeenCalledOnceWith('person@example.com');
  });

  it('should prevent duplicate submissions while sending', () => {
    component.subscriberEmail = 'person@example.com';
    submittedStatus.next('sending');

    component.submitSubscriber();

    expect(emailListSubscribeService.submitSubscriberEmail).not.toHaveBeenCalled();
  });

  it('should render sending, success, and error states', () => {
    submittedStatus.next('sending');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sending subscription request');
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTrue();

    component.subscriberEmail = 'person@example.com';
    submittedStatus.next('success');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('confirmation email has been sent');
    expect(fixture.nativeElement.textContent).toContain('person@example.com');

    submittedStatus.next('error');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('could not be completed');
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalse();
  });
});
