import { useState } from "react";

type Player = "X" | "O";
type CellValue = Player | null;
type Board = CellValue[];

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board: Board): Player | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  let status: string;
  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (isDraw) {
    status = "Empate!";
  } else {
    status = `Vez de: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Jogo da velha</h1>
      <p style={styles.status}>{status}</p>

      <div style={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={styles.cell}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={handleReset} style={styles.resetButton}>
        Reiniciar
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    fontFamily: "sans-serif",
    padding: "1.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  status: {
    fontSize: "1.1rem",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gridTemplateRows: "repeat(3, 80px)",
    gap: "6px",
  },
  cell: {
    fontSize: "2rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
  },
  resetButton: {
    marginTop: "0.5rem",
    padding: "0.5rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#f5f5f5",
  },
};