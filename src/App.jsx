import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { useStore } from './store/useStore';

export default function App() {
  const initAuth = useStore((s) => s.initAuth);
  useEffect(() => initAuth(), [initAuth]);

  return (
    <div className="min-h-dvh grid grid-rows-[auto,1fr]">
      <NavBar />
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
}
