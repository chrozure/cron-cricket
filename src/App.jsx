import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tutorial from './pages/Tutorial'
import Levels from './pages/Levels'
import LevelPlay from './pages/LevelPlay'
import Practice from './pages/Practice'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/levels/:id" element={<LevelPlay />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  )
}
