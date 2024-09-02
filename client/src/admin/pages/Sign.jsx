
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Sign= ({ Session, setuserData, setSession }) => {
const navigate = useNavigate();

const [Form, setForm] = useState();
const [User, setUser] = useState();

const handleChange = (e) => {
  setForm({
    ...Form,
    [e.target.name]: e.target.value,
  });
  console.log(Form);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:5000/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Form),
    method: "POST",
  });

  const data = await response.json();

  if (data.status === "true" && data.user === "Admin") {
    setSession(1);
    // setUser(data.fname);
    navigate("/Dashboard");
  } else {
    alert("Invalid username or password!");
 
  }
};
  return (
    <div>
       <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo.png" alt=""/>
                  <span class="d-none d-lg-block">SUadmin</span>
                </a>
              </div>
              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your username & password to login</p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>

                    <div class="col-12">
                      <label for="email" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input class="form-control" onChange={handleChange}
                  type="email"
                  name="email"
                  id="email" required/>
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input onChange={handleChange}
                  type="password"
                  name="password"
                  id="password" class="form-control" required/>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                  
                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                    <div class="col-12">
                   {/*} <p class="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>-->*/}
                    </div>
                  </form>

                </div>
              </div>

              <div class="credits">
              
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
    </div>
  )
}

export default Sign
