import { useAuth } from '../state/authContext';

// PUBLIC_INTERFACE
export default function useAuthHook() {
  return useAuth();
}
