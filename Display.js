class Display {
  constructor(displayValorAnterior, displayValorActual) {
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
    this.calculador = new Calculadora();
    this.tipoOperacion = undefined;
    this.valorActual = "";
    this.valorAnterior = "";
    this.signos = { sumar: "+", restar: "-", multiplicar: "x", dividir: "/" };
  }
  borrar() {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    this.imprimirValores();
  }
  borrarTodo() {
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.imprimirValores();
  }
  computar(tipo) {
    console.log("Tipo de operacion", tipo);
    if (this.valorActual === "") return; // no se ha ingresado un número previamente
    this.tipoOperacion !== "igual" && this.calcular();
    this.tipoOperacion = tipo;
    this.valorAnterior = this.valorActual || this.valorAnterior;
    this.valorActual = "";
    this.imprimirValores();
  }
  agregarNumero(numero) {
    if (numero === "." && this.valorActual.includes(".")) return;
    if (numero === "0" && this.valorActual === "0") return; // no se pueden ingresar muchos ceros como primer número
    if (this.valorActual === "0" && numero !== ".") {
      // si el primer número es cero y no se ingresa un punto, se reemplaza por el número ingresado
      this.valorActual = numero;
    } else {
      this.valorActual = this.valorActual + numero;
    }
    this.imprimirValores();
  }
  imprimirValores() {
    this.displayValorActual.textContent =
      this.valorActual === "" ? "" : this.valorActual;
    this.displayValorAnterior.textContent = `${this.valorAnterior} ${
      this.signos[this.tipoOperacion] || ""
    }`;
  }
  calcular() {
    const valorAnterior = parseFloat(this.valorAnterior);
    const valorActual = parseFloat(this.valorActual);
    if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    this.tipoOperacion &&
      (this.valorActual = this.calculador[this.tipoOperacion](
        valorAnterior,
        valorActual
      ));
    if (this.valorActual === 0) {
      this.valorActual = "0";
    }
  }
}
