import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  dataAlt: string,
  children: ReactNode
};
export const Button = ({ children, onClick, disabled, dataAlt }: Props) => {
  return (
    <button
      className="button-with-text"
      onClick={onClick}
      disabled={disabled}
      data-alt={dataAlt}
    >
        {children}
    </button>
  );
};