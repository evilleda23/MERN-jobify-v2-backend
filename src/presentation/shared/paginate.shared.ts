export class Paginate {
  constructor() {}

  static create(
    page: number,
    limit: number,
    total: number,
    items: unknown[],
    resourceType: string
  ) {
    return {
      page: page,
      limit: limit,
      total: total,
      next:
        items.length === limit
          ? `/api/${resourceType}?page=${page + 1}&limit=${limit}`
          : null,
      prev:
        page - 1 > 0
          ? `/api/${resourceType}?page=${page - 1}&limit=${limit}`
          : null,
      [resourceType]: items,
    };
  }
}
