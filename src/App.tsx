import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TetronimoSelector from "./components/TetronimoSelector/TetronimoSelector";

function App() {
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex" }}>
        <TetronimoSelector />
        <GridDisplay columnCount={10} rowCount={20} />
      </div>
    </>
  );
}

export default App;
