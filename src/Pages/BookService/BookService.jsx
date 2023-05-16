import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/Context/AuthProvider";
import Swal from 'sweetalert2'

const BookService = () => {
  const service = useLoaderData();
  const { title , price , _id , img } = service;
  const { user } = useContext(AuthContext)

  const handleBookService = event => {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const booking = {
        customerName : name,
        date,
        email,
        price : price,
        service_id : _id,
        service : title,
        img
    }

    fetch('http://localhost:5000/bookings' , {
      method : 'POST',
      headers : {
        'content-type' : 'application/json',
      },
      body : JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        Swal.fire(
          'Booking Added',
          'You clicked the button!',
          'success'
        )
      }
    })
  }

  return (
    <div>
      <h2 className="text-center text-3xl">Book now : {title}</h2>
      <form onSubmit={handleBookService}>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              name="date"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              defaultValue={user?.email}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
              type="text"
              defaultValue={price}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              value="Order Confirm"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookService;
