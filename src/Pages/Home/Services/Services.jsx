import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('https://cars-doctor-server-beta.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    

    return (
        <div className="bg-base-200 pt-5">
            <div className="text-center space-y-5">
                <h3 className="text-2xl font-bold text-orange-600">Service</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br />words which don&apos;t look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-col-2 lg:grid-col-3 gap-6 justify-center">
                {
                    services.map(service => <ServiceCard 
                        key={service._id}
                        service={service}
                    />)
                }
            </div>
        </div>
    );
};

export default Services;