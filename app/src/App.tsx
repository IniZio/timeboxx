import { useQuery } from "urql";

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

  return (
    <div className="App">
      <h1 un-text="purple">{askHello.fetching ? "Loading..." : askHello.data?.hello}</h1>
    </div>
  );
}

export default App;
