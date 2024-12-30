import { Link } from "react-router";
import { services } from "../../constants/services";
const HotelServices = () => {
  return (
    <div className="p-8">
      <Link
        to={"/auth/rooms"}
        className="text-orange-600 underline text-sm font-medium mb-4 inline-block"
      >
        All Rooms
      </Link>
      <h2 className="text-2xl font-bold text-teal-600 mb-6">Otel Hizmetleri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services &&
          services?.map((service, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm flex items-start space-x-4"
            >
              <div className="text-3xl">{service.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-teal-700">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotelServices;
