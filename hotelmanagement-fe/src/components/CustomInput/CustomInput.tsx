type Props = {};

const CustomInput = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        // value={value}
        // onClick={onClick}
        readOnly
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Select Date"
      />
      <span
        // onClick={onClick}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
      >
        📅
      </span>
    </div>
  );
};

export default CustomInput;
