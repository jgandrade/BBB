export interface ILead {
  id: string;
  businessId: string;
  locationId: string;
  link: string;
  contactNumber: string;
  business: string;
  owner: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Lead implements ILead {
  readonly id: string;

  readonly businessId: string;

  readonly locationId: string;

  readonly link: string;

  readonly contactNumber: string;

  readonly business: string;

  readonly owner: string;

  createdAt?: Date;

  updatedAt?: Date;

  protected constructor({
    id,
    businessId,
    locationId,
    link,
    contactNumber,
    business,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: string;
    businessId: string;
    locationId: string;
    link: string;
    contactNumber: string;
    business: string;
    owner: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.businessId = businessId;
    this.locationId = locationId;
    this.link = link;
    this.contactNumber = contactNumber;
    this.business = business;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(BusinessProperties: {
    id: string;
    businessId: string;
    locationId: string;
    link: string;
    contactNumber: string;
    business: string;
    owner: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Lead(BusinessProperties);
  }
}

export { Lead };
