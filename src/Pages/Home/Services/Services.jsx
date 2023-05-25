import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [asceding, setAsceding] = useState(true);
  
  const searchRef = useRef(null);
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`https://cars-doctor-server-beta.vercel.app/services?search=${search}&sort=${asceding ? "asc" : "desc"}`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [asceding , search]);

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  }

  return (
    <div className="bg-base-200 pt-5">
      <div className="text-center space-y-5">
        <h3 className="text-2xl font-bold text-orange-600">Service</h3>
        <h2 className="text-5xl">Our Service Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised <br />
          words which don&apos;t look even slightly believable.{" "}
        </p>
      </div>
      <div className="form-control ml-12 mt-12 ">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            ref={searchRef}
          />
          <button className="btn btn-square" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-center mt-5 mb-5">
        <button
          className="btn btn-primary"
          onClick={() => setAsceding(!asceding)}
        >
          {asceding ? "Price : High to Low" : "Price : Low to High"}
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-col-2 lg:grid-col-3 gap-6 justify-center p-12">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
