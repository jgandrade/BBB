import { createObjectIdString } from "../../../utils";

export interface ILocation {
  id: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  isTracked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Location implements ILocation {
  readonly id: string;

  readonly country: string;

  readonly city: string;

  readonly state: string;

  readonly zipCode: string;

  private _isTracked: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  protected constructor({
    id,
    country,
    city,
    state,
    zipCode,
    isTracked,
    createdAt,
    updatedAt,
  }: {
    id: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
    isTracked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this._isTracked = isTracked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id = createObjectIdString(),
    country,
    city,
    state,
    zipCode,
    isTracked = false,
    createdAt,
    updatedAt,
  }: {
    id: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
    isTracked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Location({
      id,
      country,
      city,
      state,
      zipCode,
      isTracked,
      createdAt,
      updatedAt,
    });
  }

  get isTracked() {
    return this._isTracked;
  }

  trackLocation() {
    this._isTracked = true;
  }
}

export { Location };
