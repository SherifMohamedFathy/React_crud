import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  console.log({ rest });
  return (
    <button className={`${className} text-white rounded-lg  p-2 flex-1`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
