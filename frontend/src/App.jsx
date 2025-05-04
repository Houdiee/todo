import TodoList from './TodoList';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
