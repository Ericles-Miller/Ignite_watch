import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { History } from './components/History';
import { DefaultLayout } from './layout/DefaultLayout';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}