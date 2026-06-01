import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useVisitorTracker } from '@/hooks/useVisitorTracker';

export default function App() {
  useVisitorTracker();

  return <RouterProvider router={router} />;
}