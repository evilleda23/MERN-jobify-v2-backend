import { regularExps } from './regular-exp';
describe('Test regular-exp', () => {
  test('should valid email', () => {
    const validEmail = regularExps.email.test('test@test.com');
    const invalidEmail = regularExps.email.test('testtest.com');
    expect(validEmail).toBe(true);
    expect(invalidEmail).toBe(false);
  });
  test('should valid password', () => {
    const validPassword = regularExps.password.test('Test1234!');
    const invalidPassword = regularExps.password.test('test1234');
    expect(validPassword).toBe(true);
    expect(invalidPassword).toBe(false);
  });
});
