import PropTypes from 'prop-types';
import { useState } from 'react';
import calculate from '../logic/Calculate';

function Calculator() {
  const [data, setData] = useState(
    {
      total: null,
      next: null,
      operation: null,
    },
  );

  const handleClick = (buttonName) => {
    const newData = calculate(data, buttonName);
    setData(newData);
  };

  return (
    <div className="calcPage">
      <h2>Let&apos;s do some math!</h2>
      <div className="calculator">
        <div id="screen">{data.next || data.total || '0'}</div>
        <CalculatorButtons button={['AC', '+/-', '%', '÷']} onClick={handleClick} />
        <CalculatorButtons button={['7', '8', '9', 'x']} onClick={handleClick} />
        <CalculatorButtons button={['4', '5', '6', '-']} onClick={handleClick} />
        <CalculatorButtons button={['1', '2', '3', '+']} onClick={handleClick} />
        <div className="row">
          <button type="button" className="left-button zero" onClick={() => handleClick('0')}>0</button>
          <button type="button" className="left-button dot" onClick={() => handleClick('.')}>.</button>
          <button type="button" className="right-button" onClick={() => handleClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
}

function CalculatorButtons(props) {
  const { button, onClick } = props;
  return (
    <div className="row">
      {button.map((item, index) => (
        <button
          type="button"
          key={item}
          className={index === button.length - 1 ? 'right-button' : 'left-button'}
          onClick={() => onClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

CalculatorButtons.propTypes = {
  button: PropTypes.arrayOf(PropTypes.string.isRequired),
  onClick: PropTypes.func.isRequired,
};

CalculatorButtons.defaultProps = {
  button: [],
};

export default Calculator;
