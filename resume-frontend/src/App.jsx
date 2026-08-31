import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GeneratePage from "./pages/GeneratePage";
import HistoryList from "./pages/HistoryList";
import HistoryDetail from "./pages/HistoryDetail";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Generate Resume</Link>
        <Link to="/history">History</Link>
      </nav>

      <div className="app-container">
      <Routes>
        <Route path="/" element={<GeneratePage />} />
        <Route path="/history" element={<HistoryList />} />
        <Route path="/history/:id" element={<HistoryDetail />} />
      </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
