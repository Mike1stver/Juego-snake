import React from "react";
import Modal from "./Modal";
import "./styles/button.css";
import "./styles/gameovermodal.css";
import Button from "./Button";

function GameOverModal({ gameFinished, score, showRecord }) {
  return (
    <Modal>
      <div className="GameOverModal-modal-box">
        <h1 className="GameOverModal-title">Perdiste!!! :( </h1>
        <h1 className="GameOverModal-subTitle">Obtuviste {score} puntos!!</h1>
        <Button
          color="strong-blue"
          message="Juega Otra vez!"
          onClick={() => gameFinished()}
        />
        <Button
          color="primary"
          message="Ver puntuación"
          onClick={() => showRecord()}
        />
      </div>
    </Modal>
  );
}

export default GameOverModal;
