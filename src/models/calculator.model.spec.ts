
import { RoundingCalculatorModel, StandardCalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ActionKeys } from '../enums/action-keys.enum';
import { RoundingCalculatorModelFactory, StandardCalculatorModelFactory } from '../factories/calculatorfactories';

describe('CalculatorModel', (): void => {

  let standardFactory: StandardCalculatorModelFactory;
  let roundingFactory: RoundingCalculatorModelFactory;
  let standardCalculator: ICalculatorModel;
  let roundingCalculator: ICalculatorModel;

  beforeEach((): void => {
    standardFactory = new StandardCalculatorModelFactory();
    roundingFactory = new RoundingCalculatorModelFactory(2);
    standardCalculator = standardFactory.createCalculator();
    roundingCalculator = roundingFactory.createCalculator();
    standardCalculator.pressActionKey(ActionKeys.CLEAR);
  });

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {

    expect(standardCalculator).toBeDefined();

  });

  it('should have an empty display on init', (): void => {

    // Act
    const displayValue: string = standardCalculator.display();

    // Assert
    expect(displayValue).toEqual('');

  });

  it('should display `1` when the `1` key is pressed', (): void => {

    // Act
    standardCalculator.pressNumericKey(NumericKeys.ONE);
    const displayValue: string = standardCalculator.display();

    // Assert
    expect(displayValue).toEqual('1');

  });

  it('should display `2` when the `2` key is pressed', (): void => {

    standardCalculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = standardCalculator.display();

    expect(displayValue).toEqual('2');

  });

  it('should display `98` when the `9` key is pressed followed by the `8` key', (): void => {

    standardCalculator.pressNumericKey(NumericKeys.NINE);
    standardCalculator.pressNumericKey(NumericKeys.EIGHT);
    const displayValue: string = standardCalculator.display();

    expect(displayValue).toEqual('98');

  });

  it('should display `13` when equals is clicked on `7 + 6`', (): void => {

    standardCalculator.pressNumericKey(NumericKeys.SEVEN);
    standardCalculator.pressOperatorKey(OperatorKeys.PLUS);
    standardCalculator.pressNumericKey(NumericKeys.SIX);
    standardCalculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = standardCalculator.display();

    expect(displayValue).toEqual('13');

  });

  it('should display `5` when equals is clicked on `15 - 10`', (): void => {

    standardCalculator.pressNumericKey(NumericKeys.ONE);
    standardCalculator.pressNumericKey(NumericKeys.FIVE);
    standardCalculator.pressOperatorKey(OperatorKeys.MINUS);
    standardCalculator.pressNumericKey(NumericKeys.ONE);
    standardCalculator.pressNumericKey(NumericKeys.ZERO);
    standardCalculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = standardCalculator.display();

    expect(displayValue).toEqual('5');

  });

  it('should display `21` when equals is clicked on `3 * 7`', (): void => {

    standardCalculator.pressNumericKey(NumericKeys.THREE);
    standardCalculator.pressOperatorKey(OperatorKeys.MULT);
    standardCalculator.pressNumericKey(NumericKeys.SEVEN);
    standardCalculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = standardCalculator.display();

    expect(displayValue).toEqual('21');

  });

  it('should display `12` when equals is clicked on `144 / 12`', (): void => {

    standardCalculator.pressNumericKey(NumericKeys.ONE);
    standardCalculator.pressNumericKey(NumericKeys.FOUR);
    standardCalculator.pressNumericKey(NumericKeys.FOUR);
    standardCalculator.pressOperatorKey(OperatorKeys.DIV);
    standardCalculator.pressNumericKey(NumericKeys.ONE);
    standardCalculator.pressNumericKey(NumericKeys.TWO);
    standardCalculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = standardCalculator.display();

    expect(displayValue).toEqual('12');

  });

  it('should display `1.33 when equals is clicked on `4 / 3` with a rounding calculator with precision 2', (): void => {

    roundingCalculator.pressNumericKey(NumericKeys.FOUR);
    roundingCalculator.pressOperatorKey(OperatorKeys.DIV);
    roundingCalculator.pressNumericKey(NumericKeys.THREE);
    roundingCalculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = roundingCalculator.display();

    expect(displayValue).toEqual('1.33');
  });

  it('should display `2.00` when equals is clicked on `4 / 2` with a rounding calculator with precision 2', (): void => {

    roundingCalculator.pressNumericKey(NumericKeys.FOUR);
    roundingCalculator.pressOperatorKey(OperatorKeys.DIV);
    roundingCalculator.pressNumericKey(NumericKeys.TWO);
    roundingCalculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = roundingCalculator.display();

    expect(displayValue).toEqual('2.00');    
  });

});
