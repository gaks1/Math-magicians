import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import calculate from '../logic/Calculate';
import operate from '../logic/Operate';
import '@testing-library/jest-dom';
import Calculator from './Calculator';
import Quote from './Quote';

describe('Calculator', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Calculator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Calculator component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('renders calculator with initial state', () => {
    expect(screen.getByText("Let's do some math!")).toBeInTheDocument();
    expect(screen.getByTestId('display').textContent).toBe('0');
  });

  test('renders calculator with AC', () => {
    fireEvent.click(
      screen.getAllByText('1').find((el) => el.tagName === 'BUTTON')
    );
    fireEvent.click(
      screen.getAllByText('AC').find((el) => el.tagName === 'BUTTON')
    );
    expect(screen.getByTestId('display').textContent).toBe('0');
  });

  test('renders calculator with 1', () => {
    fireEvent.click(
      screen.getAllByText('1').find((el) => el.tagName === 'BUTTON')
    );
    expect(screen.getByTestId('display').textContent).toBe('1');
  });

  test('renders calculator with 1 + 1', () => {
    fireEvent.click(
      screen.getAllByText('1').find((el) => el.tagName === 'BUTTON')
    );
    fireEvent.click(
      screen.getAllByText('+').find((el) => el.tagName === 'BUTTON')
    );
    fireEvent.click(
      screen.getAllByText('1').find((el) => el.tagName === 'BUTTON')
    );
    fireEvent.click(
      screen.getAllByText('=').find((el) => el.tagName === 'BUTTON')
    );
    expect(screen.getByTestId('display').textContent).toBe('2');
  });
});

describe('Calculate function', () => {
  test('AC button resets the calculator', () => {
    const obj = {
      total: '5',
      next: '3',
      operation: '+',
    };
    const result = calculate(obj, 'AC');
    expect(result).toEqual({ total: null, next: null, operation: null });
  });

  test('Decimal button adds decimal point', () => {
    const obj = {
      total: null,
      next: '5',
      operation: null,
    };
    const result = calculate(obj, '.');
    expect(result).toEqual({ total: null, next: '5.', operation: null });
  });

  test('= button performs the operation', () => {
    const obj = {
      total: '5',
      next: '3',
      operation: '+',
    };
    const result = calculate(obj, '=');
    expect(result).toEqual({ total: '8', next: null, operation: null });
  });

  test('+/- button negates the value', () => {
    const obj = {
      total: '5',
      next: '3',
      operation: '+',
    };
    const result = calculate(obj, '+/-');
    expect(result).toEqual({ total: '5', next: '-3', operation: '+' });
  });

  test('Operation button sets the operation', () => {
    const obj = {
      total: '5',
      next: null,
      operation: null,
    };
    const result = calculate(obj, '+');
    expect(result).toEqual({ total: '5', next: null, operation: '+' });
  });
});

describe('operate', () => {
  test('adding', () => {
    expect(operate(1, 2, '+')).toBe('3');
  });

  test('subtracting', () => {
    expect(operate(1, 2, '-')).toBe('-1');
  });

  test('multiplying', () => {
    expect(operate(1, 2, 'x')).toBe('2');
  });

  test('dividing', () => {
    expect(operate(1, 2, '÷')).toBe('0.5');
  });

  test('dividing by zero', () => {
    expect(operate(1, 0, '÷')).toBe("Can't divide by 0.");
  });

  test('modulus', () => {
    expect(operate(1, 2, '%')).toBe('1');
  });

  test('modulus by zero', () => {
    expect(operate(1, 0, '%')).toBe("Can't find modulo as can't divide by 0.");
  });

  test('invalid operator', () => {
    let errorThrown = false;
    try {
      operate(1, 2, '/');
    } catch (err) {
      errorThrown = true;
      expect(err.message).toBe("Unknown operation '/'");
    }
    expect(errorThrown).toBe(true);
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Quote />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders quote after loading data', async () => {
    const mockData = [{ quote: 'Success is not final, failure is not fatal' }];
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      });
    });
    render(<Quote />);
    const quote = await screen.findByText(mockData[0].quote);
    expect(quote).toBeInTheDocument();
    window.fetch.mockRestore();
  });
});
