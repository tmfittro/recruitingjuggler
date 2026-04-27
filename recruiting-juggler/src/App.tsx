import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ApplicationDetail from './pages/ApplicationDetail'
import AddEditApplication from './pages/AddEditApplication'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="applications/new" element={<AddEditApplication />} />
          <Route path="applications/:id/edit" element={<AddEditApplication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
