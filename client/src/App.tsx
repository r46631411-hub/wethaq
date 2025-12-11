import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import WethaqDescriptionPage from "./pages/WethaqDescriptionPage";
import WethaqChoicePage from "./pages/WethaqChoicePage";
import WethaqUploadPage from "./pages/WethaqUploadPage";
import WethaqPreviewPage from "./pages/WethaqPreviewPage";
import WethaqVoiceAssistantPage from "./pages/WethaqVoiceAssistantPage";
import WethaqScreenReaderPage from "./pages/WethaqScreenReaderPage";
import WethaqVoiceCommandsPage from "./pages/WethaqVoiceCommandsPage";
import NafathSendCodePage from "./pages/NafathSendCodePage";
import NafathEnterCodePage from "./pages/NafathEnterCodePage";
import NafathVerifiedPage from "./pages/NafathVerifiedPage";
import WethaqSignaturePage from "./pages/WethaqSignaturePage";
import WethaqSealedPage from "./pages/WethaqSealedPage";
import WethaqCompletionPage from "./pages/WethaqCompletionPage";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"\\"} component={LoginPage} />
      <Route path={"/services"} component={ServicesPage} />
      <Route path={"/wethaq-description"} component={WethaqDescriptionPage} />
      <Route path={"/wethaq-choice"} component={WethaqChoicePage} />
      <Route path={"/wethaq-upload"} component={WethaqUploadPage} />
      <Route path={"/wethaq-preview"} component={WethaqPreviewPage} />
      <Route path={"/wethaq-voice-assistant"} component={WethaqVoiceAssistantPage} />
      <Route path={"/wethaq-screen-reader"} component={WethaqScreenReaderPage} />
      <Route path={"/wethaq-voice-commands"} component={WethaqVoiceCommandsPage} />
      <Route path={"/nafath-send-code"} component={NafathSendCodePage} />
      <Route path={"/nafath-enter-code"} component={NafathEnterCodePage} />
      <Route path={"/nafath-verified"} component={NafathVerifiedPage} />
      <Route path={"/wethaq-signature"} component={WethaqSignaturePage} />
      <Route path={"/wethaq-sealed"} component={WethaqSealedPage} />
      <Route path={"/wethaq-completion"} component={WethaqCompletionPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
