interface IProps {
  msg: string;
}

const ErrorMessage = ({ msg }: IProps) => {
  return msg ? <span className="text-red-700 block font-semibold text-sm">{msg}</span> : null;
};

export default ErrorMessage;
