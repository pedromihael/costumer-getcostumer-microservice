
import 'reflect-metadata';
import { container } from 'tsyringe';
import { MongoCostumerRepository } from "../../controllers/repositories/MongoCostumerRepository";
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";

container.registerSingleton<ICostumerRepository>('CostumerRepository', MongoCostumerRepository);