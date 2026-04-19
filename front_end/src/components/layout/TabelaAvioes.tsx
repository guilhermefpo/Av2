import styles from "./TabelaAvioes.module.css";

interface Aviao {
  id: number;
  modelo: string;
  status: "Concluído" | "Em Teste" | "Atrasado";
  ultimaAtualizacao: string;
}

const dadosDummy: Aviao[] = [
  {
    id: 1,
    modelo: "Boeing 737 Max",
    status: "Em Teste",
    ultimaAtualizacao: "19/04/2026",
  },
  {
    id: 2,
    modelo: "Embraer E195-E2",
    status: "Concluído",
    ultimaAtualizacao: "18/04/2026",
  },
  {
    id: 3,
    modelo: "Airbus A320neo",
    status: "Atrasado",
    ultimaAtualizacao: "17/04/2026",
  },
];

export function TabelaAvioes() {
  return (
    <div className={styles.container}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo da Aeronave</th>
            <th>Status de Produção</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {dadosDummy.map((aviao) => (
            <tr key={aviao.id}>
              <td>#{aviao.id}</td>
              <td>{aviao.modelo}</td>
              <td>
                <span
                  className={`${styles.status} ${styles[aviao.status.replace(/\s/g, "")]}`}
                >
                  {aviao.status}
                </span>
              </td>
              <td>{aviao.ultimaAtualizacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
