import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const Addfaculty = () => {
    const [editorData, setEditorData] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserForm((prevNext) => ({
            ...prevNext,
            image: file, // Update the state with the selected file
        }));
    };

    const [userForm, setUserForm] = useState({
        name: "",
        biodata: "",
        publication: "",

        school: "",
        experience: "",
        qualification: "",
        email: "",
        phone: "",
        research: "",
        subjects: ""
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
            .post("http://localhost:5000/faculty/add-faculty", userForm)
            .then((res) => {
                console.log(res.data);
                setUserForm({
                    name: "",
                    biodata: "",
                    publication: "",
                    school: "",
                    experience: "",
                    qualification: "",
                    email: "",
                    phone: "",
                    research: "",
                    subjects: ""
                });
                setSuccessMessage("Data added successfully!"); // Set success message
                setTimeout(() => {
                    setSuccessMessage(""); // Clear the message after 3 seconds
                    navigate("/facultylist"); // Navigate to the faculty list page
                }, 3000);
            })
            .catch((err) => {
                console.error("There was an error adding the faculty!", err);
            });
    };

    useEffect(() => { }, []);
    return (
        <div>
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Faculty</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/Dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item active">Add Faculty</li>
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
                                                placeholder="Faculty" required="" />
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
                                                <option value="1">School Of Law</option>
                                                <option value="2">School Of Commerce & Management Studies</option>
                                                <option value="3">School Of Pharmasecutical Science  </option>
                                                <option value="4">School Of Computer Science & Engineering </option>
                                                <option value="5">School Of Engineering & Technology</option>
                                                <option value="10">School Of Beauty Cosmetology </option>
                                                <option value="17">SSchool Of Design</option>
                                                <option value="31">School Of Vocational Studies</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6 ">
                                            <input type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                id="experience"
                                                name="experience"
                                                value={userForm.experience}
                                                placeholder="Experience" required="" />
                                        </div>

                                        <div className="col-md-6">
                                            <input type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="qualification"
                                                id="qualification"
                                                value={userForm.qualification}
                                                placeholder="Qualification" required="" />
                                        </div>


                                        <div className="col-md-6">
                                            <input type="number" className="form-control"
                                                onChange={handleChange}
                                                name="phone"
                                                id="phone"
                                                value={userForm.phone}
                                                placeholder="Phone" required="" />
                                        </div>

                                        <div className="col-md-6">
                                            <input type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                name="email"
                                                id="email"
                                                value={userForm.email}
                                                placeholder="email" required="" />
                                        </div>


                                        <div className="col-md-12">
                                            <label htmlFor="biodata">Bio</label>
                                            <CKEditor name="biodata"
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
                                            <CKEditor name="publication"
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
                                            <CKEditor name="research"
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
                                            <label htmlFor="research_work">Subject</label>
                                            <CKEditor name="subjects"
                                                id="subjects"
                                                editor={ClassicEditor}
                                                data={userForm.subjects}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setUserForm({ ...userForm, subjects: data });
                                                }}
                                            />
                                        </div>

                                        {/*   <div className="col-md-6">
                                            <label htmlFor="image">Upload Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={handleImageChange}
                                                name="image"
                                              
                                                id="image"
                                                accept="image/*"
                                                required
                                            />
                                        </div>*/}

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

export default Addfaculty
