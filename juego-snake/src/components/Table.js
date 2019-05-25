import React, { Component } from "react";
import "./styles/table.css";

let firstDirectionGrowth = 10;

export default class Table extends Component {
  state = {
    direction: "",
    body: []
  };

  validateBody = () => {
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
      var X = this.closureFunction();
      X(initialPositionX, 15, 0, 1, 3); // filtrado de X
      dirGrowthFiltered = X(initialPositionY, 0, 15, 0, 2); // filtrado de Y

      // A partir de un arreglo , obtiene una posicion aletoria hacia donde se elegira el siguiente bloque del cuerpo

      dirGrowthFiltered = this.deleteOpositeDirection(
        dirGrowthCurrent,
        dirGrowthFiltered
      );

      // console.log(dirGrowthFiltered);
      // console.log(`Movimiento anterior: ${dirGrowthCurrent}`);

      // Actualiza coordenada filtrada
      dirGrowthCurrent =
        dirGrowthFiltered[Math.floor(Math.random() * dirGrowthFiltered.length)];

      i === 0 && (firstDirectionGrowth = dirGrowthCurrent);
      // se guarda la primera direccion hacia done crecio para eliminar su opuesto como
      //primera direccion hacia donde moverse

      dirGrowthCurrent === 3 && initialPositionX--;
      dirGrowthCurrent === 0 && initialPositionY--;
      dirGrowthCurrent === 1 && initialPositionX++;
      dirGrowthCurrent === 2 && initialPositionY++;

      // console.log(`Se movera hacia: ${dirGrowthCurrent}`);
      // console.log(
      //   "Posicion Inicial: " + initialPositionX + " " + initialPositionY
      // );
      // Luego de validarse

      // Adjunta la nueva posicion al arreglo
      body = this.attachToBodyArray(
        initialBody,
        initialPositionX,
        initialPositionY
      );
      initialBody = body;
      // console.log(body);
    }
    console.log(
      `La primera direccion hacia donde crecio fue ${firstDirectionGrowth}`
    );

    return body;
  };

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

  attachToBodyArray(bodyArray, positionX, positionY) {
    return [...bodyArray, `${positionX.toString()}&${positionY.toString()}`];
  }

  ///// Closure stage

  validateClosure() {
    var temp = this.outerFunction();
    console.log(temp(2));
    console.log(temp(2));
    console.log(temp(2));
    console.log(temp());
    console.log(temp());
  }

  outerFunction() {
    // let dirGrowth = [0, 1, 2, 3];
    var count = 1;
    function innerFunction(numero = 1) {
      console.log(
        `Hola Soy la funcion inner y count vale: ${count} , el prop es ${numero}`
      );
      count++;
    }
    return innerFunction;
  }

  componentDidMount() {
    // console.log(` Desde componenteDidMount : ${this.validateBody()}`);

    this.setState({
      body: this.validateBody()
    });

    // this.validateClosure();
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
