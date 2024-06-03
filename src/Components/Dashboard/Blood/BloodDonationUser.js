import React, { useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase outside of the component to avoid reinitialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const BloodDonationUser = () => {
  const db = firebase.firestore();

  const nameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const bloodGroupRef = useRef(null);
  const addressRef = useRef(null);

  const clearFormFields = () => {
    nameRef.current.value = "";
    mobileNumberRef.current.value = "";
    bloodGroupRef.current.value = "";
    addressRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const mobileNumber = mobileNumberRef.current.value;
    const bloodGroup = bloodGroupRef.current.value;
    const address = addressRef.current.value;

    // Input validation: Check if all fields are filled
    if (!name || !mobileNumber || !bloodGroup || !address) {
      console.error("All fields must be filled!");
      alert("All fields must be filled!");
      return;
    }

    // Insert data into Firestore
    db.collection("Donors")
      .add({
        name,
        mobileNumber,
        bloodGroup,
        address,
        date: new Date().toISOString(),
      })
      .then(() => {
        console.log("Document successfully written!");
        // Clear form fields after submission
        clearFormFields();
        alert("Data successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <div>
      <h3>Please fill the form for blood donation</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="col-3">
            <input
              type="text"
              ref={nameRef}
              placeholder="Your Name"
              className="form-control"
            />
          </div>
          <div className="col-3">
            <input
              type="tel"
              ref={mobileNumberRef}
              placeholder="Mobile Number"
              className="form-control"
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              ref={bloodGroupRef}
              placeholder="Blood Group"
              className="form-control"
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              ref={addressRef}
              placeholder="Address"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group text-right">
          <button type="submit" className="btn btn-brand">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodDonationUser;
