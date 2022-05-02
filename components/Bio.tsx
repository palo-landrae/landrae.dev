export const BioSection = ({ children }): JSX.Element => {
  return <div className="flex flex-row">{children}</div>;
};

export const BioYear = ({ children }): JSX.Element => {
  return <span className="font-bold mr-2">{children}</span>;
};
