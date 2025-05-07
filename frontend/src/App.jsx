import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import QuestionnairePage from './pages/QuestionnairePage';
import RoutinePage from './pages/RoutinePage';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/cuestionario" element={
          <PrivateRoute>
            <QuestionnairePage />
          </PrivateRoute>
        } />
        <Route path="/rutina/:id" element={
          <PrivateRoute>
            <RoutinePage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;