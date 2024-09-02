import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editplacement = () => {
  const [userForm, setUserForm] = useState({
    name: "",
    stream: "",
    collage: "",
    year: "",
    company: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  let params = useParams();
  let navigate = useNavigate();

  const handleChange = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/placement/update-placement/" + params.id, {
        name: userForm.name,
        stream: userForm.stream,
        collage: userForm.collage,
        year: userForm.year,
        company: userForm.company,
      })
      .then((res) => {
        console.log({ status: res.status });
        setSuccessMessage("Data updated successfully!"); // Set success message
        setTimeout(() => {
          setSuccessMessage(""); // Clear the message after 3 seconds
          navigate("/placement-list");
        }, 3000);
      })
      .catch((err) => {
        console.error("There was an error updating the placement!", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/placement/get-placement/" + params.id)
      .then((res) => {
        setUserForm({
          name: res.data.data.name,
          stream: res.data.data.stream,
          city: res.data.data.city,
          year: res.data.data.year,
          collage: res.data.data.collage,
          company: res.data.data.company,
        });
      });
  }, [params.id]);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Placements</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Pages</li>
              <li className="breadcrumb-item active">Edit Placements</li>
            </ol>
          </nav>
        </div>

        <section className="section contact">
          <div className="row gy-4">
            <div className="col-xl-12">
              <div className="card p-4">
                <form method="post" className="php-email-form" onSubmit={onUpdate}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        className="form-control"
                        value={userForm.name}
                        placeholder="Student Name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        name="stream"
                        id="stream"
                        value={userForm.stream}
                        placeholder="Stream"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        name="company"
                        value={userForm.company}
                        id="company"
                        placeholder="Company"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        value={userForm.year}
                        name="year"
                        id="year"
                        placeholder="Year"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        name="collage"
                        id="collage"
                        value={userForm.collage}
                        placeholder="Collage"
                        required
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      <button type="submit">Update</button>
                    </div>
                  </div>
                </form>
                {successMessage && (
                  <div className="alert alert-success mt-4 text-center">
                    {successMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Editplacement;
