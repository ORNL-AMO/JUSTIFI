import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmailListSubscribeService } from './email-list-subscribe.service';

@Component({
  selector: 'app-email-list-subscribe',
  templateUrl: './email-list-subscribe.component.html',
  styleUrls: ['./email-list-subscribe.component.css'],
  standalone: false
})
export class EmailListSubscribeComponent {
  private readonly emailListSubscribeService = inject(EmailListSubscribeService);

  readonly submittedStatus = toSignal(this.emailListSubscribeService.submittedStatus, { initialValue: undefined });
  subscriberEmail = '';
  invalidEmailMessage = '';

  ngOnInit(): void {
    this.emailListSubscribeService.submittedStatus.next(undefined);
  }

  checkValid(): void {
    this.invalidEmailMessage = this.emailListSubscribeService.checkEmailValid(
      this.subscriberEmail.trim()
    ) || '';
  }

  submitSubscriber(): void {
    if (this.submittedStatus() === 'sending') {
      return;
    }

    const email = this.subscriberEmail.trim();
    this.invalidEmailMessage = this.emailListSubscribeService.checkEmailValid(email) || '';

    if (!email || this.invalidEmailMessage) {
      return;
    }

    this.subscriberEmail = email;
    this.emailListSubscribeService.submitSubscriberEmail(email).subscribe();
  }
}
