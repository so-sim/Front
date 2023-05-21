// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { server } from '@/mocks/server';
import 'react-toastify/dist/ReactToastify.css';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';

expect.extend(matchers);
// beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
