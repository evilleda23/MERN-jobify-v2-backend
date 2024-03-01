import { BcryptAdapter } from './bcrypt.plugin';
describe('Bcrypt Plugin', () => {
  test('should return a valid hash', async () => {
    const hash = await BcryptAdapter.hash('1234');
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(60);
  });
  test('should compare hash and string and return true', async () => {
    const hash = await BcryptAdapter.hash('1234');
    const result = await BcryptAdapter.compare('1234', hash);
    expect(result).toBe(true);
  });
  test('should compare hash and string and return false', async () => {
    const hash = await BcryptAdapter.hash('1234');
    const result = await BcryptAdapter.compare('12345', hash);
    expect(result).toBe(false);
  });
});
