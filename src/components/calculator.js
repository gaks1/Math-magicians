import PropTypes from 'prop-types';

function Calculator() {
  return (
    <div className="calculator">
      <div id="screen" />
      <CalculatorButtons button={['AC', '+/-', '%', '÷']} />
      <CalculatorButtons button={['7', '8', '9', 'x']} />
      <CalculatorButtons button={['4', '5', '5', '-']} />
      <CalculatorButtons button={['1', '2', '3', '+']} />
      <div className="row">
        <button type="button" className="left-button zero">1</button>
        <button type="button" className="left-button dot">.</button>
        <button type="button" className="right-button">=</button>
      </div>
    </div>
  );
}

function CalculatorButtons(props) {
  const { button } = props;
  return (
    <div className="row">
      {button.map((item, index) => (
        <button type="button" key={item} className={index === button.length - 1 ? 'right-button' : 'left-button'}>{item}</button>
      ))}
    </div>
  );
}

CalculatorButtons.propTypes = {
  button: PropTypes.arrayOf(PropTypes.string.isRequired),
};

CalculatorButtons.defaultProps = {
  button: [],
};

export default Calculator;
