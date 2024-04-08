import React from "react";
import "./components/styles/App.css";
import CatBreedsList from "./components/CatBreedsList";
import TemperamentAndSocialNeedsChart from "./components/TemperamentAndSocialNeedsChart";
import HealthAndWellnessChart from "./components/HealthAndWellnessChart";
import FamilySuitabilityChart from "./components/FamilySuitabilityChart";
import EnergyExerciseLevelsChart from "./components/EnergyExerciseLevelsChart";
import PopularityAvailabilityChart from "./components/PopularityAvailabilityChart";
import NativeEnvironmentEffectChart from "./components/NativeEnvironmentEffectChart";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Raças de Gatos</h1>
      </div>
      <CatBreedsList limit={2} />
      <TemperamentAndSocialNeedsChart limit={2} />
      <HealthAndWellnessChart limit={2} />
      <FamilySuitabilityChart limit={2} />
      <EnergyExerciseLevelsChart limit={2} />
      <PopularityAvailabilityChart limit={2} />
      <NativeEnvironmentEffectChart limit={2} />
    </div>
  );
}

export default App;
