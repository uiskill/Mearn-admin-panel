import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import 'bootstrap/dist/css/bootstrap.min.css';

const Placement = () => {
  const [userForm, setUserForm] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const deletePlacement = () => {
    axios
      .delete("http://localhost:5000/placement/delete-placement/" + selectedUserId)
      .then(() => {
        setUserForm(userForm.filter((user) => user._id !== selectedUserId));
        setSelectedUserId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/placement/")
      .then((res) => {
        setUserForm(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle search functionality
  useEffect(() => {
    setFilteredData(
      userForm.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.stream.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.year.toString().includes(searchTerm.toLowerCase()) ||
        user.collage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1); // Reset to the first page on search
  }, [searchTerm, userForm]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle download as Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Placements");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileName = "placements_data.xlsx";
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, fileName);
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Placement Details</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Placement</li>
              <li className="breadcrumb-item active">Placement Details</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card p-2">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <Link className="btn btn-primary" to="/add-placement">
                      Add Placements
                    </Link>
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-warning" onClick={handleDownloadExcel}>
                      Download Excel
                    </button>
                  </div>

                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Stream</th>
                        <th>Company</th>
                        <th>Year</th>
                        <th>Collage</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.stream}</td>
                          <td>{user.company}</td>
                          <td>{user.year}</td>
                          <td>{user.collage}</td>
                          <td className="d-flex justify-content-center">
                            <Link
                              className="btn btn-primary btn-sm me-2"
                              to={"/edit-placement/" + user._id}
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                              onClick={() => setSelectedUserId(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <nav>
                    <ul className="pagination justify-content-center">
                      {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                          <button onClick={() => paginate(number + 1)} className="page-link">
                            {number + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bootstrap Modal for Delete Confirmation */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this record?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deletePlacement}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placement;
