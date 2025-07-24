import { createRoot } from 'react-dom/client';
import AppRouter from './App.tsx';  // Import AppRouter
import { TransactionsProvider } from './components/TransactionsContext';  // Import TransactionsProvider
import { TransactionsModalProvider } from './contexts/TransactionsModalContext';  // Import TransactionsModalProvider
import './index.css';

const container = document.getElementById("root");
const root = createRoot(container!);

// Wrap AppRouter with TransactionsProvider and TransactionsModalProvider
root.render(
  <TransactionsProvider>
    <TransactionsModalProvider>
      <AppRouter />
    </TransactionsModalProvider>
  </TransactionsProvider>
);
