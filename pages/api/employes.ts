// src/pages/api/employes.ts
import { employees } from 'utils/mockInformation';
import { NextApiRequest, NextApiResponse } from 'next';

const employesrequest =  (req: NextApiRequest, res: NextApiResponse) => {
  // Simulación de datos de empleados
  return res.status(200).json(employees);
};

export default employesrequest;
