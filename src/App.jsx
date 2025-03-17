import { createGlobalStyle } from "styled-components";

// import { MyComp } from "./Mycomp";
// import { CounterWithoutState } from "./Components/State/CounterWithoutState";
// import { CounterWithState } from "./Components/State/CounterWithState";
// import { NameForm } from "./Components/State/NameForm";
import { Example1 } from "./Components/2_Effect/Example1";
import { Example2 } from "./Components/2_Effect/Example2";
import Example3 from "./Components/2_Effect/Example3";
import Example4 from "./Components/2_Effect/Example4";
import Button from "./Components/3_Props/Button";
import Menu from "./Components/3_Props/Menu";
import BasicRouter from "./Components/4_Router/BasicRouter";
import ReactRouter from "./Components/4_Router/ReactRouter";
import SendAPI from "./Components/2_Effect/SendAPI";

import MovieListMain from "./Components/MovieList/MovieListMain";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Poppins;
}
a {
  text-decoration: none;
  color: inherit; // inherit는 부모컬러를 따라하라는 의미
}
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <MovieListMain />
    </div>
  );
}

export default App;
