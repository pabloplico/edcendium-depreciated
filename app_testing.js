// src/components/App.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Helper function to render components that need Router context
const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
}

describe('App', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });
});