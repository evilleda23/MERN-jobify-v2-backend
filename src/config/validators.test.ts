import { Validators } from './validators';
describe('Test validators', () => {
  test('should valid mongo id', () => {
    const validMongoId = Validators.isMongoId('60d7cbbf2f4f8d0015d2c7a8');
    const invalidMongoId = Validators.isMongoId('60d7cbbf2f4f8d0015d2c7a8a');
    expect(validMongoId).toBe(true);
    expect(invalidMongoId).toBe(false);
  });
  test('should valid enum value', () => {
    const validEnumValue = Validators.isValidEnumValue('ACTIVE', [
      'ACTIVE',
      'INACTIVE',
    ]);
    const invalidEnumValue = Validators.isValidEnumValue('ACTIVE', [
      'INACTIVE',
    ]);
    const emptyValue = Validators.isValidEnumValue('', ['INACTIVE']);
    expect(validEnumValue).toBe(true);
    expect(invalidEnumValue).toBe(false);
    expect(emptyValue).toBe(false);
  });
});
