import { PromptOption } from "@authgear/web";
import { atom } from "@iniz/react";
import { useCallback } from "react";
import { useQuery } from "urql";

import { authClient } from "./apis/auth/client";
import { graphql } from "./apis/graphql/generated";
import { Router, Routes } from "./Router";

const sayHelloDocument = graphql(`
  query sayHello {
    ping
  }
`);

const counter = atom(1);
const increment = () => counter(counter() + 1);

function App() {
  const [askHello] = useQuery({
    query: sayHelloDocument,
  });

  const handleLogin = useCallback(() => {
    authClient.startAuthentication({
      redirectURI: `http://localhost:5173${Routes.OAuthRedirect}`,
      prompt: PromptOption.Login,
    });
  }, []);

  return (
    <div className="App">
      <h1 un-text="purple">{askHello.fetching ? "Loading..." : askHello.data?.ping}</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={increment}>{counter()}++</button>
      <Router />
    </div>
  );
}

export default App;
