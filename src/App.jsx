import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DashboardOverview from './pages/DashboardOverview.jsx';
import AddProjectPage from './pages/AddProjectPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage>
              <DashboardOverview />
            </DashboardPage>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/add"
        element={
          <ProtectedRoute>
            <DashboardPage>
              <AddProjectPage />
            </DashboardPage>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/projects"
        element={
          <ProtectedRoute>
            <DashboardPage>
              <ProjectsPage />
            </DashboardPage>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
