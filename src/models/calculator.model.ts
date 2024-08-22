
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

abstract class AbstractCalculatorModel implements ICalculatorModel {
  
  protected _buffer: string = '';

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._buffer += key;
  }

  public pressActionKey(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this._buffer = '';
        break;
      case ActionKeys.DOT:
        this._buffer += '.';
        break;
      case ActionKeys.EQUALS:
        // eslint-disable-next-line no-eval
        this._buffer = (<number> eval(this._buffer)).toString();
        break;
      default:
        throw new Error('Invalid Action');
    }
  }
  
  public abstract display(): string  
}

/**
 * StandardCalculatorModel: A simple calculator model that displays the buffer as is.
 * This class is a singleton.
 */
export class StandardCalculatorModel extends AbstractCalculatorModel 
                                     implements ICalculatorModel {

  // reference to the singleton instance                                    
  private static _theInstance: StandardCalculatorModel;                                    
  
  // constructor is private to prevent instantiation
  private constructor() {
    super();
  }

  // theInstance() returns the singleton
  public static theInstance(): StandardCalculatorModel {
    if (!StandardCalculatorModel._theInstance) {
      StandardCalculatorModel._theInstance = new StandardCalculatorModel();
    }
    return StandardCalculatorModel._theInstance;
  }

  public display(): string {
    return this._buffer;
  }
}

/**
 * RoundingCalculatorModel: A calculator model that rounds the buffer to a fixed number of decimals.
 */
export class RoundingCalculatorModel extends AbstractCalculatorModel 
                                      implements ICalculatorModel {

  public constructor(private nrDecimals: number) {
    super();
  }

  public display(): string {
    return parseFloat(this._buffer).toFixed(this.nrDecimals);
  }
}
