import React, { Component } from "react";
import "./styles/table.css";

export default class Table extends Component {
  state = {
    direction: "",
    body: []
  };

  validateBody = () => {
    let dirGrowth = [0, 1, 2, 3]; // 0:arriba, 1:derecha, 2:abajo, 3: izquierda
    var dirGrowthFiltered = [];
    var dirGrowthCurrent = 10; // Guarda la direccion hacia donde crecera el snake
    var initialBody = ["12&14"]; // Acumulado de valores que cumplen con las restricciones
    var body = [];
    // let initialDirection = Math.floor(Math.random() * 4);
    // let initialPositionX = Math.floor(Math.random() * 16);

    let initialPositionX = 12;
    let initialPositionY = 14;
    console.log(
      "Posicion Inicial: " + initialPositionX + " " + initialPositionY
    );
    // Incio de Loop con initialPositionX y initialPositionY establecidos

    for (let i = 0; i < 2; i++) {
      dirGrowthFiltered = this.dirGrowthFilterY(
        this.dirGrowthFilterX(dirGrowth, initialPositionX),
        initialPositionY
      );
      // A partir de un arreglo , obtiene una posicion aletoria hacia donde se elegira el siguiente bloque del cuerpo

      switch (dirGrowthCurrent) {
        case 0:
          dirGrowthFiltered = dirGrowthFiltered.filter(num => num !== 2);
          break;
        case 2:
          dirGrowthFiltered = dirGrowthFiltered.filter(num => num !== 0);
          break;
        case 1:
          dirGrowthFiltered = dirGrowthFiltered.filter(num => num !== 3);
          break;
        case 3:
          dirGrowthFiltered = dirGrowthFiltered.filter(num => num !== 1);
          break;
        default: // no se ejecutara
      }
      console.log(dirGrowthFiltered);
      console.log(`Movimiento anterior: ${dirGrowthCurrent}`);

      dirGrowthCurrent =
        dirGrowthFiltered[Math.floor(Math.random() * dirGrowthFiltered.length)];

      dirGrowthCurrent === 3 && initialPositionX--;
      dirGrowthCurrent === 0 && initialPositionY--;
      dirGrowthCurrent === 1 && initialPositionX++;
      dirGrowthCurrent === 2 && initialPositionY++;

      console.log(`Se movera hacia: ${dirGrowthCurrent}`);
      console.log(
        "Posicion Inicial: " + initialPositionX + " " + initialPositionY
      );
      // Luego de validarse

      body = this.attachToBodyArray(
        initialBody,
        initialPositionX,
        initialPositionY
      );
      initialBody = body;
      console.log(body);
    }
    return body;
  };

  dirGrowthFilterX(dirGrowth, initialPositionX) {
    switch (initialPositionX) {
      case 15:
        return dirGrowth.filter(num => num !== 1);
      case 0:
        return dirGrowth.filter(num => num !== 3);
      default:
        return dirGrowth;
    }
  }
  dirGrowthFilterY(dirGrowth, initialPositionY) {
    switch (initialPositionY) {
      case 0:
        return dirGrowth.filter(num => num !== 0);
      case 15:
        return dirGrowth.filter(num => num !== 2);
      default:
        return dirGrowth;
    }
  }

  attachToBodyArray(bodyArray, positionX, positionY) {
    return [...bodyArray, `${positionX.toString()}&${positionY.toString()}`];
  }

  componentDidMount() {
    // console.log(` Desde componenteDidMount : ${this.validateBody()}`);
    this.setState({
      body: this.validateBody()
    });
    // this.setState({
    //   direction : Math.floor(Math.random() * 4),
    // })
  }

  render() {
    var index = 0;
    var initialTable = [];
    // var valoresPrueba = ["4&5", "4&6", "4&7"];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        initialTable[index] = `${y}&${x}`;
        index++;
      }
    }
    console.log(initialTable);
    var filteredTable = initialTable.map(item => (
      <div className={`square ${this.state.body.includes(item).toString()}`}>
        {item}{" "}
      </div>
    ));
    console.log(filteredTable);

    return (
      <div className="table">
        <div className="grid-table">{filteredTable}</div>
      </div>
    );
  }
}
