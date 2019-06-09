import React from "react";
import Modal from "./Modal";
import "./styles/welcomemodal.css";

function WelcomeModal({ gameStarted }) {
  return (
    <Modal>
      <h1 className="WelcomeModal-title">Hola!! Bienvenido al juego snake</h1>
      <button
        className="welcomemodal-button"
        onClick={() => {
          gameStarted();
        }}
      >
        Empezar el Juego!
      </button>
    </Modal>
  );
}

export default WelcomeModal;
