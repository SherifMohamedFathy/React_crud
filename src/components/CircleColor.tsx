interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span {...rest} className={`block mt-2 w-5 h-5 rounded-full cursor-pointer`} style={{ backgroundColor: color }} />
  );
};

export default CircleColor;
