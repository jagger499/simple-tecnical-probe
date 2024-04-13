"use client";
import { fetcher } from "utils/fetcher";
import { Employee } from "utils/mockInformation";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const { data, error } = useSWR("/api/employes", fetcher);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [show, setShow] = useState<boolean>(false);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const employees: Employee[] = data;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShow(false);
    const selectedEmployeeString = event.target.value;
    const selectedEmployee = JSON.parse(selectedEmployeeString) as Employee;
    setSelectedEmployee(selectedEmployee);
  };

  const handleReset = () => {
    setSelectedEmployee(null);
  }

  const handleSearch = () => {
    setShow(true);
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="px-2 mb-14 text-4xl font-bold">Prueba tecnica</h1>
      <div className="flex flex-col">
        <label htmlFor="empleado" className="px-2">
          Selecciona el dni del empleado:
        </label>
        <div className="flex items-center space-x-2">
          <select
            onChange={handleChange}
            id="empleado"
            className="appearance-none w-60 pr-8 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled={!!selectedEmployee}>
              Seleccionar DNI
            </option>
            {employees.map((employee) => (
              <option key={employee.dni} value={JSON.stringify(employee)}>
                {employee.dni}
              </option>
            ))}
          </select>

          <div className="flex space-x-2">
            <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
              Buscar
            </button>
            <button onClick={handleReset} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none">
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {show && selectedEmployee && (
        <div className="w-full mt-10 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombre Completo</th>
                <th className="px-4 py-2">Nacimiento</th>
                <th className="px-4 py-2">Nro de Legajo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{selectedEmployee.nombre}</td>
                <td className="border px-4 py-2">
                  {selectedEmployee.nacimiento}
                </td>
                <td className="border px-4 py-2">
                  {selectedEmployee.numeroLegajo}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
