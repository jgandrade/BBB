import { ClientSession } from "mongoose";
import CreateLeadsRequestMapper from "./mapper";
import { CreateLeadsRequestModel } from "./schema";
import { ICreateLeadsRequest } from "../../domain/models/createLeadsRequest/createLeadsRequest";

export default class CreateLeadsRequestRepository {
  private models: {
    CreateLeadsRequestModel: typeof CreateLeadsRequestModel;
  };

  private mappers: {
    CreateLeadsRequestMapper: typeof CreateLeadsRequestMapper;
  };

  constructor(
    models = {
      CreateLeadsRequestModel,
    },
    mappers = {
      CreateLeadsRequestMapper,
    }
  ) {
    this.models = models;
    this.mappers = mappers;
  }

  public async save(leadRequest: ICreateLeadsRequest, session?: ClientSession) {
    const schema = this.mappers.CreateLeadsRequestMapper.toPersistence(leadRequest);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const { _id, ...toUpdateFields } = schema;

    await this.models.CreateLeadsRequestModel.findOneAndUpdate(
      { _id: schema._id },
      { $set: toUpdateFields },
      { upsert: true, new: true, lean: true, session }
    );
  }

  public async findByIdempotencyKey(idempotencyKey: {
    businessName: string;
    location: string;
  }) {
    const leadRequest = await this.models.CreateLeadsRequestModel.findOne({
      "idempotencyKey.businessName": idempotencyKey.businessName,
      "idempotencyKey.location": idempotencyKey.location,
    }).lean();

    if (leadRequest === null) {
      return null;
    }

    const domainObject =
      this.mappers.CreateLeadsRequestMapper.toDomain(leadRequest);

    return domainObject;
  }
}
