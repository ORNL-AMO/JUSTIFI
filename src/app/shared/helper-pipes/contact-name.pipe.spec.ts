import { ContactNamePipe } from './contact-name.pipe';

describe('ContactNamePipe', () => {
  let pipe: ContactNamePipe;

  it('create an instance', () => {
    pipe = new ContactNamePipe();
    expect(pipe).toBeTruthy();
  });
});
