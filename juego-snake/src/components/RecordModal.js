import React from "react";
import "./styles/recordmodal.css";

function RecordModal({ scores }) {
  return (
    <div className="RecordModal-modal-box">
      <h1 className="position-table">Tabla de puntos</h1>
      {scores.map(item => (
        <li>{item}</li>
      ))}
    </div>
  );
}

export default RecordModal;
