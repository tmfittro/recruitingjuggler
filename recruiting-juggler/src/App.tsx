import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ApplicationDetail from './pages/ApplicationDetail'
import AddEditApplication from './pages/AddEditApplication'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="applications/new" element={<AddEditApplication />} />
          <Route path="applications/:id/edit" element={<AddEditApplication />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
