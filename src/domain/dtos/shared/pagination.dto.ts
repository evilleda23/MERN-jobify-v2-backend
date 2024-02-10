export class PaginationDto {
  constructor(public page: number, public limit: number) {}
  static create(query: unknown): [string?, PaginationDto?] {
    const { page, limit } = query as Record<string, any>;
    const _page = Number(page);
    const _limit = Number(limit);
    if (isNaN(_page) || isNaN(_limit))
      return ['Page and limit must be numbers'];
    if (_page < 1) return ['Page must be greater than 0'];
    if (_limit < 1) return ['Limit must be greater than 0'];

    return [, new PaginationDto(_page, _limit)];
  }
  static getName(): string {
    return this.name;
  }
}
