import "./Style.scss";

export const SelectField = ({
  id,
  name,
  style,
  options,
  onChange,
  value,
  className,
}) => {
  const handleChange = (event) => onChange(event);
  return (
    <select
      className={className}
      onChange={handleChange}
      id={id}
      name={name}
      value={value}
    >
      <option key="default" value="">
        Choose a Field
      </option>
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
