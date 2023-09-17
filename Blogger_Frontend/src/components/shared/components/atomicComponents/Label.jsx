export const Label = ({ htmlFor, label }) => {
  return <label htmlFor={htmlFor} data-testid="label">{label}</label>;
};
