import { useState } from "react";
import NetworkGraph from "./NetworkGraph";
import { Edge, Node } from "./interfaces/interfaceNetworks";

const App = () => {
  // Tipamos los nodos como un array de objetos con `id` y `label`
  const [nodes, setNodes] = useState<Node[]>([]);
  // Tipamos los edges como un array de objetos con `from`, `to`, y `label`
  const [edges, setEdges] = useState<Edge[]>([]);

  const [inputNode, setInputNode] = useState<string>("");
  const [inputEdge, setInputEdge] = useState<Edge>({
    from: 0,
    to: 0,
    label: "",
  });

  const handleAddNode = () => {
    setNodes((prevNodes) => [
      ...prevNodes,
      { id: nodes.length + 1, label: inputNode }, // Nuevo nodo con id y label
    ]);
    setInputNode("");
  };

  const handleAddEdge = () => {
    setEdges((prevEdges) => [
      ...prevEdges,
      { from: inputEdge.from, to: inputEdge.to, label: inputEdge.label }, // Nueva conexión con `from`, `to`, y `label`
    ]);
    setInputEdge({ from: 0, to: 0, label: "" });
  };

  const data = {
    nodes,
    edges,
  };

  return (
    <main className="bg-primary min-h-screen py-12 px-16 flex flex-col gap-5 items-center max-lg:px-10">
      <h1 className="text-4xl font-medium text-primary-20 mb-10 text-center">
        Gestión de Riesgos Informáticos
      </h1>
      <section className="flex flex-col gap-8 justify-center w-4/5 items-center max-sm:w-11/12">
        <div className="flex gap-8 justify-center w-4/5 items-center p-6 bg-primary-10 border border-primary-20 rounded-xl max-md:flex-col max-md:w-full max-md:p-0 max-md:py-6">
          <div className="w-1/2 flex gap-5 flex-col items-center justify-center">
            {/* Formulario para nodos */}
            <h2 className="text-primary-20 text-lg">Paso 1</h2>
            <div className="w-full">
              <label htmlFor="addNode" className="text-2xl text-primary-20">
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
              <label htmlFor="fromNode" className="text-xl text-primary-20">
                Del nodo...
              </label>
              <input
                name="fromNode"
                className="h-8 w-full rounded-md border border-primary-20"
                onChange={(e) =>
                  setInputEdge({ ...inputEdge, from: parseInt(e.target.value) })
                }
                placeholder="De (ID nodo)"
              />
              <label htmlFor="toNode" className="text-xl text-primary-20">
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
              <label htmlFor="labelNode" className="text-xl text-primary-20">
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
    </main>
  );
};

export default App;
