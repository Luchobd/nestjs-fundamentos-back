// const myName = 'Luis';
// const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 23);

class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const luis = new Persona(15, 'Lucho');
luis.getSummary();
