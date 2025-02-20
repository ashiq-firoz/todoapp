import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TodoApp from './components/TodoApp'
import IndexPage from './components/IndexApp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/todo" element={<TodoApp />} />
      </Routes>
    </Router>
  )
}

export default App
