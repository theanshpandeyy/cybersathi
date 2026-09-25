import { useEffect } from "react";

import Home from "./pages/Home";
import ThreatCheck from "./pages/ThreatCheck";
import ScamSense from "./pages/ScamSense";
import CyberGuide from "./pages/CyberGuide";
import ShieldScore from "./pages/ShieldScore";

function App() {
  useEffect(() => {
    const existingParticipantId = localStorage.getItem(
      "cybersathi_participant_id"
    );

    if (existingParticipantId) {
      return;
    }

    const setupParticipant = async () => {
      try {
        const response = await fetch(
          "https://cybersathi-backend-fresh.vercel.app/api/participant"
        );

        if (!response.ok) {
          throw new Error("Unable to create participant");
        }

        const data = await response.json();

        localStorage.setItem(
          "cybersathi_participant_id",
          data.participant_id
        );
      } catch (error) {
        console.error("Participant setup failed:", error);
      }
    };

    setupParticipant();
  }, []);

  const path = window.location.pathname;

  if (path === "/threatcheck") {
    return <ThreatCheck />;
  }

  if (path === "/scamsense") {
    return <ScamSense />;
  }

  if (path === "/cyberguide") {
    return <CyberGuide />;
  }

  if (path === "/shieldscore") {
    return <ShieldScore />;
  }

  return <Home />;
}

export default App;