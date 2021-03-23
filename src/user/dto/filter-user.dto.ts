export class FilterUserDTO {
  search?: string;

  before?: Date;

  after?: Date;

  limit?: number;

  page?: number;
}