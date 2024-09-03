import {
  CreateLeadsRequest,
  LEAD_REQUEST_STATUS,
} from "../../domain/models/createLeadsRequest/createLeadsRequest";
import BusinessRepository from "../../persistence/business/repository";
import CreateLeadsRequestRepository from "../../persistence/createLeadsRequest/repository";
import LeadRepository from "../../persistence/lead/repository";
import LocationRepository from "../../persistence/location/repository";

export default class CreateLeadsRequestUseCase {
  private createLeadsRequestRepository: CreateLeadsRequestRepository;

  private businessRepository: BusinessRepository;

  private leadRepository: LeadRepository;

  private locationRepository: LocationRepository;

  constructor({
    createLeadsRequestRepository,
    businessRepository,
    leadRepository,
    locationRepository,
  }: {
    createLeadsRequestRepository: CreateLeadsRequestRepository;
    businessRepository: BusinessRepository;
    leadRepository: LeadRepository;
    locationRepository: LocationRepository;
  }) {
    this.createLeadsRequestRepository = createLeadsRequestRepository;
    this.businessRepository = businessRepository;
    this.leadRepository = leadRepository;
    this.locationRepository = locationRepository;
  }

  public async execute({
    businessId,
    locationId,
  }: {
    businessId: string;
    locationId: string;
  }) {
    const business = await this.businessRepository.findById(businessId);
    if (!business) {
      throw new Error("Business name does not exist");
    }

    const location = await this.locationRepository.findById(locationId);
    if (!location) {
      throw new Error("Location does not exist");
    }

    await this._checkLeadsRequestIsNotExisting({
      businessName: business.name,
      location: `${location.city}, ${location.state}`,
    });

    const leadRequest = await this._createLeadsRequest({
      businessName: business.name,
      location: `${location.city}, ${location.state}`,
    });

    leadRequest.currentStatus = LEAD_REQUEST_STATUS.SUCCESS;
    await this.createLeadsRequestRepository.save(leadRequest);
  }

  private async _checkLeadsRequestIsNotExisting({
    businessName,
    location,
  }: {
    businessName: string;
    location: string;
  }) {
    const leadRequest =
      await this.createLeadsRequestRepository.findByIdempotencyKey({
        businessName,
        location,
      });

    if (leadRequest) {
      throw new Error(
        `A Request is currently with status: ${leadRequest.status}`
      );
    }
  }

  private async _createLeadsRequest({
    businessName,
    location,
  }: {
    businessName: string;
    location: string;
  }) {
    const leadsRequest = CreateLeadsRequest.create({
      businessName,
      location,
    });

    await this.createLeadsRequestRepository.save(leadsRequest);

    return leadsRequest;
  }
}
