
function useSettings() {
    const defaultSettings = {
        defaultFlaggingMode: false,     //
        defaultPerfectMode: false,      // One vs Three lives
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