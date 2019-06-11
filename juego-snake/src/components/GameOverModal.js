import React from "react";
import Modal from "./Modal";
import "./styles/gameovermodal.css";

function GameOverModal({ gameFinished, score, scores }) {
  return (
    <Modal>
      <h1 className="GameOverModal-title">Perdiste!!!</h1>
      <h1 className="GameOverModal-subTitle">Obtuviste {score} puntos!!</h1>
      <button
        className="GameOverModal-button"
        onClick={() => {
          gameFinished();
        }}
      >
        Juega Otra Vez!
      </button>
    </Modal>
  );
}

export default GameOverModal;
