import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import OpeningScreen from "./pages/OpeningScreen.tsx";
import PlotScreen from "./pages/PlotScreen.tsx";
import RegisterOption from "./pages/RegisterOption.tsx";
import RegisterChild from "./pages/RegisterChild.tsx";
import MenuScreen from "./pages/MenuScreen.tsx";
import AlphabetScreen from "./pages/AlphabetScreen.tsx";
import GameMenuScreen from "./pages/GameMenuScreen.tsx";
import PasswordInstruction from "./pages/PasswordInstruction.tsx";
import PasswordGame from "./pages/PasswordGame.tsx";
import LetterInstruction from "./pages/LetterInstruction.tsx";
import ForestGame from "./pages/ForestGame.tsx";
import JungleGame from "./pages/JungleGame.tsx";
import VictoryScreen from "./pages/VictoryScreen.tsx";
import GameOverScreen from "./pages/GameOverScreen.tsx";
import ParentPassword from "./pages/ParentPassword.tsx";
import ParentDashboard from "./pages/ParentDashboard.tsx";
import AwardsScreen from "./pages/AwardsScreen.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/opening" element={<OpeningScreen />} />
          <Route path="/plot" element={<PlotScreen />} />
          <Route path="/register-option" element={<RegisterOption />} />
          <Route path="/register-child" element={<RegisterChild />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/alphabet" element={<AlphabetScreen />} />
          <Route path="/game-menu" element={<GameMenuScreen />} />
          <Route path="/password-instruction" element={<PasswordInstruction />} />
          <Route path="/password-game" element={<PasswordGame />} />
          <Route path="/letter-instruction" element={<LetterInstruction />} />
          <Route path="/forest-game" element={<ForestGame />} />
          <Route path="/jungle-game" element={<JungleGame />} />
          <Route path="/victory" element={<VictoryScreen />} />
          <Route path="/game-over" element={<GameOverScreen />} />
          <Route path="/parent-password" element={<ParentPassword />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/awards" element={<AwardsScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
