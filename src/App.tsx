import "./App.css";
import TurnBuilder from "./components/TurnBuilder/TurnBuilder";

function App() {
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex" }}>
        <TurnBuilder />
      </div>
    </>
  );
}

export default App;
