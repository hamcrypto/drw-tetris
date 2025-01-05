import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TetronimoSelector from "./components/TetronimoSelector/TetronimoSelector";
import { gridBuilder } from "./utils";

function App() {
  const initialArray = gridBuilder(10, 20);
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex" }}>
        <TetronimoSelector />
        {/* <GridDisplay gridState={initialArray} /> */}
      </div>
    </>
  );
}

export default App;
