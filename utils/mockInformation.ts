export interface Employee {
  dni: string;
  nombre: string;
  nacimiento: string;
  numeroLegajo: string;
}
export const add = (a: number, b: number) => {
  return a + b;
};

export const employees: Employee[] = [
  {
    dni: "12345678",
    nombre: "Juan Pérez",
    nacimiento: "01/01/1990",
    numeroLegajo: "123e4567-e89b-12d3-a456-426614174000",
  },
  {
    dni: "87654321",
    nombre: "María Rodríguez",
    nacimiento: "02/02/1985",
    numeroLegajo: "987e6543-21e8-12d3-a456-426614174000",
  },
  {
    dni: "11111111",
    nombre: "Pedro Martinez",
    nacimiento: "03/03/1982",
    numeroLegajo: "789e1234-56e7-12d3-a456-426614174000",
  },
  {
    dni: "22222222",
    nombre: "Laura Gómez",
    nacimiento: "04/04/1987",
    numeroLegajo: "456e7890-12e3-12d3-a456-426614174000",
  },
  {
    dni: "33333333",
    nombre: "Carlos Sanchez",
    nacimiento: "05/05/1995",
    numeroLegajo: "234e9012-45e6-12d3-a456-426614174000",
  },
];
