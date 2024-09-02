import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Addplacements = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        stream: "",
         collage: "",
         year: "",
         company: "",
      });
      const navigate = useNavigate(); // Initialize useNavigate
      const [successMessage, setSuccessMessage] = useState(""); // State for success message
      const handleChange = (e) => {
        setUserForm((prevNext) => ({
          ...prevNext,
          [e.target.name]: e.target.value,
        }));
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:5000/placement/add-placement", userForm)
          .then((res) => {
            console.log(res.data);
            setUserForm({
                name: "",
                stream: "",
                 collage: "",
                 year: "",
                 company: "",
            });
            setSuccessMessage("Data added successfully!"); // Set success message
            setTimeout(() => {
              setSuccessMessage(""); // Clear the message after 3 seconds
              navigate("/placement-list"); // Navigate to the placement list page
            }, 3000);
          })
          .catch((err) => {
            console.error("There was an error adding the placement!", err);
          });
      };
    
      useEffect(() => {}, []);
    return (
        <div>
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Placements</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item active">Add Placements</li>
                        </ol>
                    </nav>
                </div>

                <section className="section contact">

                    <div className="row gy-4">


                        <div className="col-xl-12">
                            <div className="card p-4">
                                <form method="post" className="php-email-form" onSubmit={onSubmit}>
                                    <div className="row gy-4">

                                        <div className="col-md-6">
                                            <input type="text" name="name"
                                                onChange={handleChange}
                                                id="name"
                                                value={userForm.name}
                                                className="form-control"
                                                placeholder="Student Name" required="" />
                                        </div>

                                        <div className="col-md-6 ">
                                            <input type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                id="stream"
                                                name="stream"
                                                value={userForm.stream}
                                                placeholder="Stream" required="" />
                                        </div>

                                        <div className="col-md-6">
                                            <input type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="company"
                                                id="company"
                                                value={userForm.company}
                                                placeholder="Company" required="" />
                                        </div>


                                        <div className="col-md-6">
                                            <input type="number" className="form-control"
                                                onChange={handleChange}
                                                name="year"
                                                id="year"
                                                value={userForm.year}
                                                placeholder="Year" required="" />
                                        </div>

                                        <div className="col-md-12">
                                            <input type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="collage"
                                                id="collage"
                                                value={userForm.collage}
                                                placeholder="Collage" required="" />
                                        </div>

                                        <div className="col-md-12 text-center">

                                         <button type="submit">Add</button>
                                        </div>

                                    </div>
                                    {successMessage && (
                  <div className="alert alert-success mt-4 text-center">
                    {successMessage}
                  </div>
                )}
                                </form>
                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </div>
    )
}

export default Addplacements
