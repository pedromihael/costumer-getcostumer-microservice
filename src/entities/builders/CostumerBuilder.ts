import { CostumerDTO } from '../DTOs/CostumerDTO'

export class CostumerBuilder {
  private costumerData: typeof CostumerDTO

  constructor(id: string) {
    this.costumerData = {
      _id: id,
      name: 'any name',
      age: 0,
      company: 'any company',
      email: 'any email',
      picture: 'any picture url',
      phone: 'any phone',
      greeting: 'any greeting'
    }
  }

  public setName(name: string) {
    this.costumerData.name = name;
    return this;
  }

  public setAge(age: number) {
    this.costumerData.age = age;
    return this;
  }

  public setCompany(company: string) {
    this.costumerData.company = company;
    return this;
  }

  public setEmail(email: string) {
    this.costumerData.email = email;
    return this;
  }

  public setPicture(picture: string) {
    this.costumerData.picture = picture;
    return this;
  }

  public setPhone(phone: string) {
    this.costumerData.phone = phone;
    return this;
  }

  public setGreeting(greeting: string) {
    this.costumerData.greeting = greeting;
    return this;
  }

  public build() {
    return this.costumerData;
  }
}