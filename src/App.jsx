import { Routes, Route , useNavigate} from "react-router-dom";
import { useState , useRef , useEffect } from "react";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Page404 from "./Pages/Page404";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute"; 
import authStore from "./store/authStore"; // Zustand state for user authentication

function App() {

  const { role } = authStore((state) => state);
  const navigate = useNavigate();

  // Use a global recognition instance to avoid duplicates
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  // Voice command handler
  const handleVoiceCommand = (command) => {
    console.log("Detected voice command:", command);
  
    const normalizedCommand = command.replace(/[^a-z0-9]/g, "").toLowerCase();
  
    if (normalizedCommand.includes("home") || normalizedCommand.includes("landing")) {
      navigate("/");
    } else if (normalizedCommand.includes("login")) {
      navigate("/login");
    } else if (normalizedCommand.includes("signup") || normalizedCommand.includes("signup")) {
      navigate("/signup");
    } else if (normalizedCommand.includes("about")) {
      navigate("/about");
    } else if (normalizedCommand.includes("dashboard")) {
      navigate("/user/dashboard");
    }else {
      console.log("Unrecognized voice command:", command);
    }
  };
  

  // Initialize SpeechRecognition once
  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      setTranscript(command);
      handleVoiceCommand(command);
    };

    recognition.onerror = (error) => {
      //console.warn("Speech recognition error:", error);
      restartRecognition();
    };

    recognition.onend = () => {
      // Restart when stopped for any reason
      restartRecognition();
    };

    const startRecognition = () => {
      try {
        recognition.start();
      } catch (error) {
        console.warn("Recognition already started, skipping start.");
      }
    };

    const restartRecognition = () => {
      setTimeout(() => {
        startRecognition();
      }, 1000); // slight delay before restart
    };

    // Start immediately
    startRecognition();

    return () => {
      recognition.stop();
    };
  }, []);

  return (

    <>

          {/* Optional floating transcript display */}
          <div style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "5px",
        zIndex: 999
      }}>
        <p style={{ margin: 0 }}>🎙️ Heard: {transcript}</p>
      </div>



    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>

        <Route path="about" element={<About />} />

        <Route path="*" element={<Page404 />} />

      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout role={role} />}>
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


       
        
      </Route>

    </Routes>
    
    
    </>
    
  );
}

export default App;
