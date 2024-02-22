import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import AboutPage from "./components/About";
import ContactPage from "./components/Contact";
import VoiceCheckIn from "./components/VoiceCheckIn";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="voice-check-in" element={<VoiceCheckIn />} />

        
        <Route />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
