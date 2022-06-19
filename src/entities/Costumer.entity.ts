import { getModelForClass, prop } from "@typegoose/typegoose";

class Costumer {
  @prop({ unique: true, required: true })
  public _id!: string;

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

  @prop()
  public greeting?: string;
}

export const costumerModel = getModelForClass(Costumer)