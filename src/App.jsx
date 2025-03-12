import { MyComp } from "./Mycomp";
import { CounterWithoutState } from "./Components/State/CounterWithoutState";
import { CounterWithState } from "./Components/State/CounterWithState";
import { NameForm } from "./Components/State/NameForm";
function App() {
  return (
    <div>
      <NameForm />
    </div>
  );
}

export default App;
