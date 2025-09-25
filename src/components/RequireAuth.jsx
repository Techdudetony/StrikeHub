import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function RequireAuth({ children }) {
    const user = useStore((s) => s.user);
    const location = useLocation();

    // If not logged in, bounce to /login and remember where they came from
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
}
