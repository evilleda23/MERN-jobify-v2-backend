import { Uuid } from './uuid.plugin';
describe('UUID Plugin', () => {
  test('should return a valid UUID', () => {
    const uuid = Uuid.generate();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[14][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });
});
