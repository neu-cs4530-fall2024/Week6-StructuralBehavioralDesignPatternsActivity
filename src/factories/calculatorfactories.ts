import { ICalculatorModel } from "../interfaces/calculator-model.interface";
import { RoundingCalculatorModel, StandardCalculatorModel } from "../models/calculator.model";

abstract class AbstractCalculatorModelFactory {
  public abstract createCalculator(): ICalculatorModel;
}

export class StandardCalculatorModelFactory extends AbstractCalculatorModelFactory {
  public createCalculator(): ICalculatorModel {
    return StandardCalculatorModel.theInstance();
  }
}

export class RoundingCalculatorModelFactory extends AbstractCalculatorModelFactory {
  private nrDecimals: number;

  public constructor(nrDecimals: number) {
    super();
    this.nrDecimals = nrDecimals;
  }

  public createCalculator(): ICalculatorModel {
    return new RoundingCalculatorModel(this.nrDecimals);
  }
}