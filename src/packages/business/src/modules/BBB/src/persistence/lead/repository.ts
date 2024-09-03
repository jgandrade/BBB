import { ClientSession } from "mongoose";
import LeadMapper from "./mapper";
import { Lead } from "./schema";
import { ILead } from "../../domain/models/lead/lead";

export default class LeadRepository {
  private models: {
    Lead: typeof Lead;
  };

  private mappers: { LeadMapper: typeof LeadMapper };

  constructor(
    models = {
      Lead,
    },
    mappers = {
      LeadMapper,
    }
  ) {
    this.models = models;
    this.mappers = mappers;
  }

  public async save(lead: ILead, session?: ClientSession) {
    const schema = this.mappers.LeadMapper.toPersistence(lead);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const { _id, ...toUpdateFields } = schema;

    await this.models.Lead.findOneAndUpdate(
      { _id: schema._id, },
      { $set: toUpdateFields },
      { upsert: true, new: true, lean: true, session }
    );
  }

  public async findById(id: string) {
    const lead = await this.models.Lead.findById(id).lean();

    if (lead === null) {
      return null;
    }

    const domainObject = this.mappers.LeadMapper.toDomain(lead);

    return domainObject;
  }

  public async findByBusinessId(businessId: string) {
    const leads = await this.models.Lead.find({ businessId }).lean();

    if (leads.length === 0) {
      return [];
    }

    const domainObjects = leads.map((lead) =>
      this.mappers.LeadMapper.toDomain(lead)
    );

    return domainObjects;
  }
}
