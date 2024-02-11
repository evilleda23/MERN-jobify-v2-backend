import { ErrorDto } from '../../interfaces';

export class PaginationDto {
  constructor(public page: number, public limit: number) {}
  static create(query: unknown): [ErrorDto[]?, PaginationDto?] {
    const { page, limit } = query as Record<string, any>;
    const _page = Number(page);
    const _limit = Number(limit);
    const errors: ErrorDto[] = [];
    if (isNaN(_page) || _page < 1)
      errors.push({
        field: 'page',
        message: 'Page must be a number and greater than 0',
      });
    if (isNaN(_limit) || _limit < 1)
      errors.push({
        field: 'limit',
        message: 'Limit must be a number and greater than 0',
      });
    if (errors.length > 0) return [errors];
    return [, new PaginationDto(_page, _limit)];
  }
  static getName(): string {
    return this.name;
  }
}
