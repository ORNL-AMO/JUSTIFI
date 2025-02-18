import { UtilityTrackedPipe } from './utility-tracked.pipe';

describe('TrackedUtilityPipe', () => {
  it('create an instance', () => {
    const pipe = new UtilityTrackedPipe();
    expect(pipe).toBeTruthy();
  });
});
