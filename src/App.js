import './App.css';
import ModalWelcome from '~components/Modal/ModalWelcome'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ModalWelcome permalink="permalink" />
      </header>
    </div>
  );
}

export default App;
