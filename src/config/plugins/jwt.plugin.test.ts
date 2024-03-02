import { JWTAdapter } from './jwt.plugin';

describe('JWT Plugin', () => {
  test('should return a valid token', async () => {
    const token = await JWTAdapter.generateToken({ id: '1234' });
    expect(typeof token).toBe('string');
  });
  test('should return a valid object', async () => {
    const token = await JWTAdapter.generateToken({ id: '1234' });
    const result = await JWTAdapter.verify<{ id: string }>(token!);
    expect(typeof result).toBe('object');
    expect(result?.id).toBe('1234');
  });
  test('should return a valid object with expiration', async () => {
    const token = await JWTAdapter.generateToken({ id: '1234' }, '1s');
    const result = await JWTAdapter.verify<{ id: string }>(token!);
    expect(typeof result).toBe('object');
    expect(result?.id).toBe('1234');
  });
  test('should return an error verifying token', async () => {
    const token = await JWTAdapter.generateToken({ id: '1234' }, '1s');
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const response = await JWTAdapter.verify<{ id: string }>(token!);
      expect(response).toBe(null);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return null if is invalid expiresIn', async () => {
    try {
      const response = await JWTAdapter.generateToken('invalid token', 'ABC');
    } catch (error) {
      expect(error).toBe(null);
    }
  });
});
