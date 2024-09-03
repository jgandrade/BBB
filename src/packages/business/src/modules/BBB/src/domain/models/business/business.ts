export interface IBusiness {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Business implements IBusiness {
  readonly id: string;

  readonly name: string;

  createdAt?: Date;

  updatedAt?: Date;

  protected constructor({
    id,
    name,
    createdAt,
    updatedAt,
  }: {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(businessProperties: {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Business(businessProperties);
  }
}

export { Business };
