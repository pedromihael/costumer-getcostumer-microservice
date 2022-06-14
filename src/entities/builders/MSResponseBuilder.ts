import { MSResponse } from "../types/MSResponse";

export class MsResponseBuilder {
  private MSResponseData: MSResponse

  constructor() {
    this.MSResponseData = {
      status: 500,
      service: 'Costumer',
      route: '/',
      response: {},
    }
  }

  public setStatus(status: number) {
    this.MSResponseData.status = status;
    return this;
  }

  public setService(service: string) {
    this.MSResponseData.service = service;
    return this;
  }

  public setRoute(route: string) {
    this.MSResponseData.route = route;
    return this;
  }

  public setResponse(response: any) {
    this.MSResponseData.response = response;
    return this;
  }

  public build() {
    return this.MSResponseData;
  }
}