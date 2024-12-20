import { useQuery } from '@apollo/client';
import { GET_ALL_SEDES } from './queries';
import './App.css';

export interface Usuario {
  nombre_completo: string;
}

export interface Sede {
  nombre: string;
  usuarios: Usuario[];
}

type GetAllSedesType = {
  getAllSedes: Sede[];
};

function App() {
  const { data, error, loading } = useQuery<GetAllSedesType>(GET_ALL_SEDES);

  if (loading) return <p>Recuperando sedes...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data && (
        <div>
          <h2>Sedes:</h2>
          <ul>
            {data.getAllSedes.map((sede: Sede) => (
              <li key={sede.nombre}>
                {sede.nombre} - Usuarios: {sede.usuarios.length}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
