import { trimImageName } from '../../utils/trimImageName';

describe('Testing trimImageName utility function', () => {
  it('trims long names and add ellipsis', () => {
    const longName = 'This is a very long image name that needs to be trimmed';
    const expected = 'This is a very long image name...';
    expect(trimImageName(longName)).toBe(expected);
  });
  it('does not trim short names', () => {
    const shortName = 'Short name';
    expect(trimImageName(shortName)).toBe(shortName);
  });
  it('does not trim names that are exactly 34 characters long', () => {
    const name = 'loerm ipsum loerm ipsum loerm ipsu';
    expect(trimImageName(name)).toBe(name);
  });
});
