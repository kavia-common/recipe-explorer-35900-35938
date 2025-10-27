const useMock = (process.env.REACT_APP_USE_MOCK ?? 'true') !== 'false';

const mockUser = {
  id: 'u_1',
  name: 'Jamie Cook',
  email: 'demo@example.com',
  avatar: '',
};

// PUBLIC_INTERFACE
export async function login(email, password) {
  if (useMock) {
    // basic mock - any email/password accepted
    await new Promise(r => setTimeout(r, 200));
    return { token: 'mock-token-123', user: { ...mockUser, email } };
  }
  // If real API is available, implement POST /auth/login
  throw new Error('Real API not implemented. Enable mock with REACT_APP_USE_MOCK=true');
}

// PUBLIC_INTERFACE
export function logout() {
  // nothing for mock
}
