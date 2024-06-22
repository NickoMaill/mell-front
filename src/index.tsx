import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import configManager from './managers/configManager.ts';
// import reportWebVitals from './reportWebVitals.ts';
// reportWebVitals(console.log);
console.log(configManager.getConfig);
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
