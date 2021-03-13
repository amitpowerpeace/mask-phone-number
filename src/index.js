import { render } from "react-dom";
import Container from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainContainer from "./MainContainer";
import { useState } from "react";
import "./style.css";
function App() {
  const [isHook, setIsHook] = useState(false);
  const [isHookText, setIsHookText] = useState("Without Hook");
  const isToggleHook = () => {
    setIsHook(!isHook);
    setIsHookText(!isHook ? "With Hook" : "WithOut Hook");
  };
  return (
    <div>
      <div className="App">
        <span
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid gray"
          }}
        >
          List of US phone numbers
        </span>
        <button className="btn primary" onClick={isToggleHook}>
          {isHookText}
        </button>
      </div>
      <div className="App">
        {!isHook ? (
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        ) : (
          <MainContainer />
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
