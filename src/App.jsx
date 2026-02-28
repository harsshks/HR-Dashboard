import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import PhotoResultPage from './pages/PhotoResultPage';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function ProtectedLayout({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <AppFooter />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/list"
            element={<ProtectedLayout><EmployeeListPage /></ProtectedLayout>} />
          <Route path="/details/:id"
            element={<ProtectedLayout><EmployeeDetailsPage /></ProtectedLayout>} />
          <Route path="/photo-result"
            element={<ProtectedLayout><PhotoResultPage /></ProtectedLayout>} />
          {/* Catch-all → login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

