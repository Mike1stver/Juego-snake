import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [showTable, setShowTable] = useState(false);
  return (
    <div className="header">
      <h1>TWISTED SNAKE!</h1>
      <p>
        Hasta la última implementación del juego, se ha logrado hacer que el
        movimiento del snake sea utilizando las teclas, sin considerar el
        control inverso. <br /> Para mover al snake, presiona las teclas de:
      </p>
      <h5>Ir hacia arriba</h5>
      <h5>Ir hacia abajo</h5>
      <h5>Ir hacia la derecha</h5>
      <h5>Ir hacia la izquierda</h5>
      <button
        onClick={() => {
          setShowTable(true);
        }}
      >
        Empezar el Juego!
      </button>
      {showTable && <Table />}
    </div>
  );
}

export default App;
