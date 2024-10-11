import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { Edge, Node } from "./interfaces/interfaceNetworks";

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}
const NetworkGraph = ({ data }: { data: GraphData }) => {
  const networkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = networkRef.current;
    const options = {
      nodes: {
        shape: "dot",
        size: 16,
        font: {
          size: 16,
        },
        color: {
          background: "#8967B3", // Color global de los nodos
          border: "#A594F9",
          highlight: {
            background: "#E5D9F2",
            border: "#F5EFFF",
          },
        },
      },
      edges: {
        arrows: "to", // Esto asegura que las flechas se muestren en las conexiones
        color: {
          color: "#624E88", // Color de la línea de conexión
        },
        font: {
          size: 14, // Tamaño del label
          align: "middle", // Alineación del texto en la línea de conexión
        },
        smooth: true, // Habilitar líneas suavizadas
      },
      physics: {
        stabilization: true,
      },
    };

    if (container) {
      new Network(container, data, options);
    }
  }, [data]);

  return <div ref={networkRef} style={{ height: "500px", width:"100%" }} />;
};

export default NetworkGraph;
