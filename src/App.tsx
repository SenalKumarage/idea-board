import './App.css';
import Board from './container/Board';
import DataProvider from './providers/DataProvider';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Board />
      </DataProvider>
    </div>
  );
}

export default App;
