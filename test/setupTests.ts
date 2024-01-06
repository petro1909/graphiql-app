import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterEach, vi, beforeAll, afterAll } from 'vitest';

export const server = setupServer();
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => server.close());
