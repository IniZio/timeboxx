import { useMount } from 'react-use';

import { useAuth } from './auth/store';
import { Router } from "./router/Router";

function App() {
  const auth = useAuth();
  useMount(() => {
    auth.fetchUserInfo();
  });

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
