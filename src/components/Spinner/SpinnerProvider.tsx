import React, { useContext, useState } from "react";
import { spinnerContext } from "./spinnerContext";

const SpinnerProvider = ({ children }) => {
  const [showSpinner, setShowSpinner] = useState<any>(false);

  return (
    <spinnerContext.Provider value={{ setShowSpinner }}>
      {showSpinner && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        </div>
      )}
      {children}
    </spinnerContext.Provider>
  );
};

export default SpinnerProvider;
