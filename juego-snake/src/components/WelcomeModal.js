import React from "react";
import Modal from "./Modal";
import "./styles/button.css";
import "./styles/welcomemodal.css";
import Button from "./Button";

function WelcomeModal({ gameStarted }) {
  return (
    <Modal>
      <div className="WelcomeModal-modal-box">
        <h1 className="WelcomeModal-title">Hola!! Bienvenido al juego snake</h1>
        <Button
          color="soft-blue"
          message="Empezar el Juego!"
          onClick={() => gameStarted()}
        />
      </div>
    </Modal>
  );
}

export default WelcomeModal;
