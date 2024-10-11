import { useState } from "react";
import NetworkGraph from "./NetworkGraph";
import ParetoChart from "./ParetoChart"; // Asegúrate de importar el componente ParetoChart
import { Edge, Node } from "./interfaces/interfaceNetworks";
import { RiLoader2Fill } from "./assets/components/Icons/RemixIcon/RiLoader2Fill";

const App = () => {
  // Tipamos los nodos como un array de objetos con `id` y `label`
  const [nodes, setNodes] = useState<Node[]>([]);
  // Tipamos los edges como un array de objetos con `from`, `to`, y `label`
  const [edges, setEdges] = useState<Edge[]>([]);

  const [inputNode, setInputNode] = useState<string>("");
  const [inputEdge, setInputEdge] = useState<Edge>({
    from: 0,
    to: 0,
    risk: 0,
    label: "",
  });

  // Estado para mostrar el gráfico de Pareto
  const [showPareto, setShowPareto] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddNode = () => {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: nodes.length + 1,
        label: `${inputNode} - nodo ${nodes.length + 1}`,
      }, // Nuevo nodo con id y label
    ]);
    setInputNode("");
  };

  const handleAddEdge = () => {
    if (inputEdge.risk > 0) {
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          from: inputEdge.from,
          to: inputEdge.to,
          label: inputEdge.label,
          risk: inputEdge.risk,
        }, // Nueva conexión con `from`, `to`, y `label`
      ]);
    }
    setInputEdge({ from: 0, to: 0, label: "", risk: 0 });
  };

  const data = {
    nodes,
    edges,
  };
  const getNodeLabelById = (id: number) => {
    const node = nodes.find((node) => node.id === id);
    return node ? node.label : `Nodo ${id}`; // Retorna el label o "Nodo ID" si no lo encuentra
  };

  const showParetoChart = () => {
    try {
      setIsLoading(true); // Cambiar a minúscula "s" en "setIsLoading"

      // Utilizar setTimeout para simular una carga
      setTimeout(() => {
        setShowPareto(true);
        setIsLoading(false); // Establecer isLoading en false después de 1 segundo
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Asegúrate de establecer isLoading en false en caso de error
    }
  };
  return (
    <main className="bg-primary-15 min-h-screen py-12 px-16 flex flex-col gap-5 items-center max-lg:px-10">
      <h1 className="text-4xl font-medium text-primary-25  mb-10 text-center">
        Gestión de Riesgos Informáticos
      </h1>
      <section className="flex flex-col gap-8 justify-center w-4/5 items-center max-sm:w-11/12">
        <div className="flex gap-8 justify-center w-4/5 items-center p-6 bg-primary-10 border border-primary-20 rounded-xl max-md:flex-col max-md:w-full max-md:p-0 max-md:py-6">
          <div className="w-1/2 flex gap-5 flex-col items-center justify-center">
            {/* Formulario para nodos */}
            <h2 className="text-primary-20 text-lg">Paso 1</h2>
            <div className="w-full">
              <label htmlFor="addNode" className="text-2xl text-primary-25">
                Añadir un nodo
              </label>
              <input
                name="addNode"
                className="h-8 w-full rounded-md border border-primary-20"
                value={inputNode}
                onChange={(e) => setInputNode(e.target.value)}
                placeholder="Añadir nodo (e.g., Usuario)"
              />
            </div>
            <button
              onClick={handleAddNode}
              className="max-w-44 rounded-md bg-primary-10 hover:bg-primary-20 border border-primary-20 transition-all duration-300 ease-in py-2 px-4 text-primary-20 hover:text-white font-medium"
            >
              Añadir Nodo
            </button>
          </div>

          {/* Formulario para conexiones */}
          <div className="flex flex-col gap-3 w-1/2 items-center">
            <h2 className="text-primary-20 text-lg">Paso 2</h2>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="fromNode" className="text-xl text-primary-25">
                Del nodo...
              </label>
              <input
                name="fromNode"
                className="h-8 w-full rounded-md border border-primary-25"
                onChange={(e) =>
                  setInputEdge({ ...inputEdge, from: parseInt(e.target.value) })
                }
                placeholder="De (ID nodo)"
              />
              <label htmlFor="toNode" className="text-xl text-primary-25">
                Al nodo
              </label>
              <input
                name="toNode"
                className="h-8 w-full rounded-md border border-primary-20"
                onChange={(e) =>
                  setInputEdge({ ...inputEdge, to: parseInt(e.target.value) })
                }
                placeholder="A (ID nodo)"
              />
              <label htmlFor="riskNode" className="text-xl text-primary-25">
                Nivel de Riesgo
              </label>
              <input
                name="riskNode"
                className="h-8 w-full rounded-md border border-primary-20"
                type="number"
                value={inputEdge.risk}
                onChange={(e) =>
                  setInputEdge({ ...inputEdge, risk: parseInt(e.target.value) })
                }
                placeholder="Riesgo (1-10)"
              />
              <label htmlFor="labelNode" className="text-xl text-primary-25">
                Titulo de la conexión
              </label>
              <input
                name="labelNode"
                className="h-8 w-full rounded-md border border-primary-20"
                value={inputEdge.label}
                onChange={(e) =>
                  setInputEdge({ ...inputEdge, label: e.target.value })
                }
                placeholder="Etiqueta (e.g., Phishing)"
              />
            </div>
            <button
              onClick={handleAddEdge}
              className="max-w-44 rounded-md bg-primary-10 hover:bg-primary-20 border border-primary-20 transition-all duration-300 ease-in py-2 px-4 text-primary-20 hover:text-white font-medium"
            >
              Añadir Conexión
            </button>
          </div>
        </div>

        {/* Componente de gráfico */}
        <NetworkGraph data={data} />
      </section>

      <section className="w-4/5 mt-10">
        <h2 className="text-primary-25 text-2xl mb-4">
          Tabla de Conexiones y Riesgos
        </h2>
        <table className="table-auto w-full border-collapse border border-primary-20 bg-primary-10 rounded-lg">
          <thead>
            <tr>
              <th className="border border-primary-20 px-4 py-2 text-primary-25">
                Conexión
              </th>
              <th className="border border-primary-20 px-4 py-2 text-primary-25">
                Riesgo
              </th>
            </tr>
          </thead>
          <tbody>
            {edges.map((edge, index) => (
              <tr key={index}>
                <td className="border border-primary-20 px-4 py-2">{`Del nodo ${getNodeLabelById(
                  edge.from
                )} al nodo ${getNodeLabelById(edge.to)} (${edge.label})`}</td>
                <td className="border border-primary-20 px-4 py-2">
                  {edge.risk}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Botón para mostrar el gráfico de Pareto */}
      <section className="w-4/5 mt-10 flex flex-col items-center gap-10">
        <button
          onClick={() => showParetoChart()}
          disabled={isLoading}
          className={`rounded-md bg-primary-10 hover:bg-primary-20 border border-primary-20 transition-all duration-300 ease-in py-2 px-4 ${
            isLoading
              ? "text-gray-400 bg-gray-200 cursor-not-allowed"
              : "text-primary-20 hover:text-white"
          } font-medium`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              Cargando
              <span className="animate-spin">
                <RiLoader2Fill className="text-xl" />
              </span>
            </span>
          ) : (
            "Generar Gráfico de Pareto"
          )}{" "}
        </button>

        {/* Mostrar el gráfico de Pareto cuando se presione el botón */}
        {showPareto && <ParetoChart edges={edges} />}
      </section>
    </main>
  );
};

export default App;
