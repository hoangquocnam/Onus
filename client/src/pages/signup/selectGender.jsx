import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function SelectGender({
  options: optionsProp,
  className: classNameProp,
  onChange: onChangeProp,
  disabled: disabledProp,
}) {
  const [option, setOption] = useState(
    optionsProp.length > 0 ? optionsProp[0] : null
  );

  useEffect(() => {
    if (onChangeProp) {
      onChangeProp({
        ...option,
        index: 0,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const selected = {
      value: e.target.value,
      label: e.target.options[e.target.selectedIndex].text,
      index: e.target.selectedIndex,
    };

    setOption(selected);

    if (onChangeProp) {
      onChangeProp(selected);
    }
  }

  return (
    <select
      className={classNameProp}
      onChange={handleChange}
      disabled={disabledProp}
      tabIndex={-1}
    >
      {optionsProp.map((item) => (
        <option
          key={item.value}
          value={item.value}
          defaultValue={item.value === option.value}
        >
          {item.label}
        </option>
      ))}
    </select>
  );
}

SelectGender.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectGender;
