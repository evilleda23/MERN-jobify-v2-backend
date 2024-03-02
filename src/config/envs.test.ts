describe('Test envs', () => {
  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs');
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
