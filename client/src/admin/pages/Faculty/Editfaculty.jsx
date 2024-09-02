import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editfaculty = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        biodata: "",
        publication: "",
        school: "",
        image: null,
        experience: "",
        qualification: "",
        email: "",
        phone: "",
        research: "",
        subjects: "",
    });

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [isDataLoaded, setIsDataLoaded] = useState(false); // State to track data loading
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
            .put(`http://localhost:5000/faculty/update-faculty/${params.id}`, userForm)
            .then((res) => {
                console.log({ status: res.status });
                setSuccessMessage("Data updated successfully!"); // Set success message
                setTimeout(() => {
                    setSuccessMessage(""); // Clear the message after 3 seconds
                    navigate("/facultylist");
                }, 3000);
            })
            .catch((err) => {
                console.error("There was an error updating the faculty!", err);
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/faculty/get-faculty/${params.id}`)
            .then((res) => {
                setUserForm({
                    name: res.data.data.name,
                    school: res.data.data.school,
                    biodata: res.data.data.biodata,
                    experience: res.data.data.experience,
                    qualification: res.data.data.qualification,
                    subjects: res.data.data.subjects,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                    publication: res.data.data.publication,
                    research: res.data.data.research,
                    image: res.data.data.image,
                });
                setIsDataLoaded(true); // Set data loaded state to true
            });
    }, [params.id]);

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Faculty</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item active">Edit Faculty</li>
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
                                                onChange={handleChange}
                                                id="name"
                                                value={userForm.name}
                                                className="form-control"
                                                placeholder="Student Name"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <select
                                                className="form-control"
                                                name="school"
                                                id="school"
                                                required
                                                onChange={handleChange}
                                                value={userForm.school}
                                            >
                                                <option value="">Select School</option>
                                                <option value="1">SCHOOL OF LAW</option>
                                                <option value="2">SCHOOL OF COMMERCE &amp; MANAGEMENT SCIENCES</option>
                                                <option value="3">SCHOOL OF PHARMACEUTICAL SCIENCES</option>
                                                <option value="4">SCHOOL OF COMPUTER SCIENCES &amp; ENGINEERING</option>
                                                <option value="5">SCHOOL OF ENGINEERING &amp; TECHNOLOGY</option>
                                                <option value="10">SCHOOL OF FASHION DESIGN &amp; BEAUTY COSMETOLOGY</option>
                                                <option value="17">SCHOOL OF DESIGN</option>
                                                <option value="31">SCHOOL OF VOCATIONAL STUDIES</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                id="experience"
                                                name="experience"
                                                value={userForm.experience}
                                                placeholder="Experience"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="qualification"
                                                id="qualification"
                                                value={userForm.qualification}
                                                placeholder="Qualification"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="phone"
                                                id="phone"
                                                value={userForm.phone}
                                                placeholder="Phone"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="email"
                                                id="email"
                                                value={userForm.email}
                                                placeholder="Email"
                                                required
                                            />
                                        </div>

                                        {/* Render CKEditor components conditionally */}
                                        {isDataLoaded && (
                                            <>
                                                <div className="col-md-12">
                                                    <label htmlFor="biodata">Biodata</label>
                                                    <CKEditor
                                                        name="biodata"
                                                        id="biodata"
                                                        editor={ClassicEditor}
                                                        data={userForm.biodata}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setUserForm({ ...userForm, biodata: data });
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <label htmlFor="publication">Publication</label>
                                                    <CKEditor
                                                        name="publication"
                                                        id="publication"
                                                        editor={ClassicEditor}
                                                        data={userForm.publication}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setUserForm({ ...userForm, publication: data });
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <label htmlFor="research">Research Work</label>
                                                    <CKEditor
                                                        name="research"
                                                        id="research"
                                                        editor={ClassicEditor}
                                                        data={userForm.research}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setUserForm({ ...userForm, research: data });
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <label htmlFor="subjects">Subjects</label>
                                                    <CKEditor
                                                        name="subjects"
                                                        id="subjects"
                                                        editor={ClassicEditor}
                                                        data={userForm.subjects}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setUserForm({ ...userForm, subjects: data });
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <div className="col-md-12 text-center">
                                            <button type="submit">Update</button>
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
    );
};

export default Editfaculty;
