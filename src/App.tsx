import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Automations from "./pages/Automations";
import AutomationDetail from "./pages/AutomationDetail";
import Guides from "./pages/Guides";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/automations" element={<Automations />} />
    <Route path="/automations/:id" element={<AutomationDetail />} />
    <Route path="/guides" element={<Guides />} />
    <Route path="/guides/:id" element={<Guides />} />
    <Route path="/faq" element={<FAQ />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
