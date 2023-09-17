import { forwardRef } from "react";
import './Style.scss'

export const InputField = forwardRef(
  ({ id, name, onChange, placeholder, type, value }, ref) => {
    const handleChange = (event) => onChange(event);

    return (
      <input
        className="dark"
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    );
  }
);
