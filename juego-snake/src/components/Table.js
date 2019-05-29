import React, { Component } from "react";
import "./styles/table.css";

let firstDirectionGrowth = 10;
let initialPositionX, initialPositionY;
let positionX, positionY;
var index = 0;
var initialTable = [];
let addBlockForward = true;

export default class Table extends Component {
  state = {
    direction: 0,
    body: []
  };

  validateBody = () => {
    var dirGrowthCurrent = 10; // Guarda la direccion hacia donde crecera el snake
    var initialBody = ["7&7"]; // Acumulado de valores que cumplen con las restricciones
    var body = [];
    // let initialDirection = Math.floor(Math.random() * 16);
    // let initialPositionX = Math.floor(Math.random() * 16);

    initialPositionX = 7;
    initialPositionY = 7;

    console.log(
      "Posicion Inicial: " + initialPositionX + " " + initialPositionY
    );
    // Incio de Loop con initialPositionX y initialPositionY establecidos
    positionX = initialPositionX;
    positionY = initialPositionY;

    for (let i = 0; i < 2; i++) {
      //Generacion de cada bloque del cuerpo inicial del snake
      ///// Se obtiene la primera direccion a donde debe crecer el cuerpo [0,1,2,3]
      dirGrowthCurrent = this.filterDirection(
        positionX,
        positionY,
        dirGrowthCurrent
      );
      ////// Se guerda la primera direccion de crecimiento
      i === 0 && (firstDirectionGrowth = dirGrowthCurrent);
      /////Actualizacion de Coordenadas

      [positionX, positionY] = this.updatePosition(
        dirGrowthCurrent,
        positionX,
        positionY
      );

      ////// Adjunta la nueva posicion al cuerpo del snake
      body = this.attachToBodyArray(initialBody, positionX, positionY);
      initialBody = body;
    }

    // Generacion de la direccion inicial del snake
    ////// Se usa la primera direccion de crecimiento para eliminar su opuesto
    firstDirectionGrowth === 0 && (dirGrowthCurrent = 2);
    firstDirectionGrowth === 1 && (dirGrowthCurrent = 3);
    firstDirectionGrowth === 2 && (dirGrowthCurrent = 0);
    firstDirectionGrowth === 3 && (dirGrowthCurrent = 1);
    ////// Filtrado de la direccion inicial de movimiento
    dirGrowthCurrent = this.filterDirection(
      initialPositionX,
      initialPositionY,
      dirGrowthCurrent
    );
    return [body, dirGrowthCurrent];
  };

  updatePosition(dirGrowthCurrent, positionX, positionY) {
    switch (dirGrowthCurrent) {
      case 3:
        positionX--;
        break;
      case 0:
        positionY--;
        break;
      case 1:
        positionX++;
        break;
      case 2:
        positionY++;
        break;
      default:
    }
    return [positionX, positionY];
  }

  filterDirection(initialPositionX, initialPositionY, lastDirection) {
    var dirGrowthFiltered = [];
    var X = this.closureFunction();

    X(initialPositionX, 15, 0, 1, 3); // filtrado de X
    dirGrowthFiltered = X(initialPositionY, 0, 15, 0, 2); // filtrado de Y

    dirGrowthFiltered = this.deleteOpositeDirection(
      lastDirection,
      dirGrowthFiltered
    );

    lastDirection =
      dirGrowthFiltered[Math.floor(Math.random() * dirGrowthFiltered.length)];
    console.log(`El ultimo valor de: ${dirGrowthFiltered}`);
    return lastDirection;
  }

  deleteOpositeDirection(direction, allowedDirection) {
    switch (direction) {
      case 0:
        return allowedDirection.filter(num => num !== 2);
      case 2:
        return allowedDirection.filter(num => num !== 0);
      case 1:
        return allowedDirection.filter(num => num !== 3);
      case 3:
        return allowedDirection.filter(num => num !== 1);
      default:
        return allowedDirection;
    }
  }

  closureFunction() {
    let dirGrowth = [0, 1, 2, 3]; // 0:arriba, 1:derecha, 2:abajo, 3: izquierda

    function filterDirection(
      initialPosition,
      valueCase1,
      valueCase2,
      directionDeleted1,
      directionDeleted2
    ) {
      switch (initialPosition) {
        case valueCase1:
          dirGrowth = dirGrowth.filter(num => num !== directionDeleted1);
          return dirGrowth;
        case valueCase2:
          dirGrowth = dirGrowth.filter(num => num !== directionDeleted2);
          return dirGrowth;
        default:
          return dirGrowth;
      }
    }
    return filterDirection;
  }

  attachToBodyArray(bodyArray, positionX, positionY, addBlockForward = false) {
    return addBlockForward
      ? [`${positionX.toString()}&${positionY.toString()}`, ...bodyArray].slice(
          0,
          bodyArray.length
        )
      : [...bodyArray, `${positionX.toString()}&${positionY.toString()}`];
  }

  componentDidMount() {
    let [body, direction] = this.validateBody();
    this.setState({
      body,
      direction
    });
    console.log(`Su primer movimieto sera hacia: ${direction}`);

    setInterval(() => {
      this.timeOutHandler();
    }, 200); // A mayor valorm mayor velocidad y mayor dificultad

    document.addEventListener("keydown", this.keyDownHandler);

    var updatedTable = initialTable.map(item => {
      return body.includes(item) ? "filled" : item;
    });

    let match = true;
    let foodIndex;
    while (match) {
      foodIndex = Math.floor(Math.random() * updatedTable.length);
      console.log(`intentos ${updatedTable[foodIndex]}`);
      updatedTable[foodIndex] === "filled" ? (match = true) : (match = false);
    }
    console.log(`La comida se encuentra en ${updatedTable[foodIndex]}`);
    console.log(`El cuerpo inicial del snake esta en ${body}`);

    // Generar de manera aleatoria la posicion de la comida, eliminando los campos que tienen fill
    // obtener el col&fila y en el render hacer un if haciendo que pinte la casilla

    // esta operacion se debe repetir en el componentedidupdate
    // por loq eu seria bueno hacer una funcion

    // en el componentedidupdate se debe analizar si se comio el alimento, si lo hizo, entonces ejecutar
    // la funcion que genera la posicion aleatoria de la comida.

    // console.log(updatedTable);
  }

  keyDownHandler = ({ key }) => {
    console.log("Se presiono");
    console.log(key);
    this.setState({
      direction: this.convertKeytoDirection(key)
    });
  };

  convertKeytoDirection(key) {
    let direction;
    key === "ArrowUp" && (direction = 0);
    key === "ArrowRight" && (direction = 1);
    key === "ArrowDown" && (direction = 2);
    key === "ArrowLeft" && (direction = 3);
    return direction;
  }

  timeOutHandler() {
    var { direction, body } = this.state;
    [initialPositionX, initialPositionY] = this.updatePosition(
      direction,
      initialPositionX,
      initialPositionY
    );

    this.setState({
      body: this.attachToBodyArray(
        body,
        initialPositionX,
        initialPositionY,
        addBlockForward
      )
    });
  }

  render() {
    index = 0;
    initialTable = [];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        initialTable[index] = `${y}&${x}`;
        index++;
      }
    }
    var filteredTable = initialTable.map(item => (
      <div
        className={`square ${this.state.body.includes(item).toString()} ${
          this.state.body[0] === item ? "initial" : ""
        }`}
      >
        {item}{" "}
      </div>
    ));

    return (
      <div className="table">
        <div className="grid-table">{filteredTable}</div>
      </div>
    );
  }
}
