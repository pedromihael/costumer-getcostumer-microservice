import { getModelForClass, prop } from "@typegoose/typegoose";

class Costumer {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public age!: number;

  @prop({ required: true })
  public company!: string;

  @prop({ required: true })
  public email!: string;

  @prop()
  public picture?: string;

  @prop()
  public phone?: string;
}

export const costumerModel = getModelForClass(Costumer)