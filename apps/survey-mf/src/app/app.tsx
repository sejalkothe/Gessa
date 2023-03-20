// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Dashboard/Home/Home';

export function App() {
  return (
    <>
      <Routes>
        <Route element={<Home/>} path={"/abc"} />
      </Routes>
      <div />
    </>
  );
}

export default App;
