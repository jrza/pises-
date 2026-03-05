import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MapPage from './pages/MapPage'
import DirectoryPage from './pages/DirectoryPage'
import SubmitPage from './pages/SubmitPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

