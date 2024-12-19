interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Container = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-[83vh]">
      <div className="flex-1 bg-gray-100 ">{children}</div>
    </div>
  );
};

export default Container;
