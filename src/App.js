import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BlackBoxProvider } from "./comp/context/BlackBoxProvider";
import PageManager from "./comp/PageManager";

function App() {
 

  return (
    <div id="App">
      <BlackBoxProvider >
      <PageManager />
      </BlackBoxProvider>
    </div>
  );
}

export default App;
