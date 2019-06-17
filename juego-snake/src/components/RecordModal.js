import React from "react";
import "./styles/recordmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function RecordModal({ scores, playgameagain }) {
  return (
    <div className="RecordModal-modal-box">
      <div className="close-icon" onClick={playgameagain}>
        <FontAwesomeIcon className="icon" icon={faTimes} />
      </div>
      <h2 className="position-table">Tabla de puntajes</h2>
      {scores.map((item, index) => (
        <ul>{`Intento numero ${index + 1}  :  ${item} ${
          item === 1 ? "Punto" : "Puntos"
        } `}</ul>
      ))}
    </div>
  );
}

export default RecordModal;
