import { Route, Routes } from 'react-router-dom'
import { NotFound } from './Pages/NotFound/NotFound'
import { Committees } from './Pages/Committees/Committees'

function App() {
  return (
    <Routes>
      <Route path="/committees" element={<Committees />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
