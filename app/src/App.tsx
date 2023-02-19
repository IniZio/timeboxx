import { PromptOption } from "@authgear/web";
import { useCallback } from "react";
import { useQuery } from "urql";

import { authClient } from "./apis/auth/client";
import { graphql } from "./apis/graphql/generated";

const sayHelloDocument = graphql(`
  query sayHello {
    hello
  }
`);

function App() {
  const [askHello] = useQuery({
    query: sayHelloDocument,
  });

  const handleLogin = useCallback(() => {
    authClient.startAuthentication({
      redirectURI: "http://localhost:5173/after-authentication",
      prompt: PromptOption.Login,
    });
  }, []);

  return (
    <div className="App">
      <h1 un-text="purple">{askHello.fetching ? "Loading..." : askHello.data?.hello}</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
