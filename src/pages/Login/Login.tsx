import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axiosInstance from "../../services/axiosInstance";
import { navigateTo } from "../../services/navigateUtil";
import { spinnerContext } from "../../components/Spinner/spinnerContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext<any>(AuthContext);
  const { setShowSpinner } = useContext(spinnerContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setShowSpinner(true);
      const response = await axiosInstance
        .post("http://localhost:8081/api/v1/doctor/signin", {
          username: email,
          password: password,
        })
        .finally(() => {
          setShowSpinner(false);
        });
      login(response.data.data);
    } catch (error) {
      setShowSpinner(false);
      navigateTo("/login");
    }
  };

  return (
    <div>
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(18, 19, 19, 0.85)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h4 className="mb-3 text-center">LOGIN</h4>
              <div className="row justify-content-center">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
