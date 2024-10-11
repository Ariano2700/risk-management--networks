import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  ChartData,
} from "chart.js";
import { Edge } from "./interfaces/interfaceNetworks";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

// Función para generar el gráfico de Pareto
const ParetoChart = ({ edges }: { edges: Edge[] }) => {
  // Ordenar los edges por nivel de riesgo
  const sortedEdges = [...edges].sort((a, b) => b.risk - a.risk);

  // Calcular el riesgo acumulado
  const totalRisk = sortedEdges.reduce((acc, edge) => acc + edge.risk, 0);
  let accumulatedRisk = 0;

  const labels = sortedEdges.map((edge) => `${edge.from} -> ${edge.to}`);
  const risks = sortedEdges.map((edge) => edge.risk);
  const accumulatedRisks = sortedEdges.map((edge) => {
    accumulatedRisk += edge.risk;
    return (accumulatedRisk / totalRisk) * 100;
  });

  // Configuración de los datos
  const data: ChartData<"bar" | "line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Riesgo",
        type: "bar",
        data: risks,
        backgroundColor: "#A594F9",
      },
      {
        label: "Riesgo Acumulado (%)",
        type: "line",
        data: accumulatedRisks,
        backgroundColor: "#8967B3",
        borderColor: "#624E88",
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        type: "linear" as const,
        position: "left" as const,
        title: {
          display: true,
          text: "Riesgo",
        },
      },
      y1: {
        beginAtZero: true,
        type: "linear" as const,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Riesgo Acumulado (%)",
        },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
};

export default ParetoChart;
