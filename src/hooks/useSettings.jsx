import { useState } from "react";

function useSettings() {
    const defaultSettings = {
        // Gameplay
        defaultFlaggingMode: false,     //
        bottomButtonsFlipped: false,
        defaultPerfectMode: false,      // One vs Three lives

        // Zoom
        zoomOnStartPC: false,
        zoomOnStartMobile: true,
        zoomOnStart: 1,
        defaultScale: 1,
    };
    const [settings, setSettings] = useState(defaultSettings);
    return {
        settings,
        setSettings
    };
}

export default useSettings;