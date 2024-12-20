import { gql } from '@apollo/client';

export const GET_ALL_SEDES = gql`
  query GetAllSedes {
    getAllSedes {
      nombre
      usuarios {
        nombre_completo
      }
    }
  }
`;