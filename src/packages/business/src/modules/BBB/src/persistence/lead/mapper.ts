import { Lead, ILead } from "../../domain/models/lead/lead";
import { ILeadSchema, ILeadWithoutTimestamps } from "./schema";
import { toObjectId, toString } from "../../utils";

export default class LeadMapper {
  public static toDomain(schemaObject: ILeadSchema): ILead {
    const leadObject = Lead.create({
      id: toString(schemaObject._id),
      businessId: toString(schemaObject.businessId),
      locationId: toString(schemaObject.locationId),
      link: schemaObject.link,
      contactNumber: schemaObject.contactNumber,
      business: schemaObject.business,
      owner: schemaObject.owner,
      createdAt: schemaObject.createdAt,
      updatedAt: schemaObject.updatedAt,
    });

    return leadObject;
  }

  public static toPersistence(domainObject: ILead): ILeadWithoutTimestamps {
    const schemaObject: ILeadWithoutTimestamps = {
      _id: toObjectId(domainObject.id),
      businessId: toObjectId(domainObject.businessId),
      locationId: toObjectId(domainObject.locationId),
      link: domainObject.link,
      contactNumber: domainObject.contactNumber,
      business: domainObject.business,
      owner: domainObject.owner,
    };

    return schemaObject;
  }
}
