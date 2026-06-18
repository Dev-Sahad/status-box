// src/themes.js

// This object acts as a dictionary for our visual styles
const themes = {
    "monochrome-dark": {
        bg: "#0d1117",         // The dark slate color of the main box background
        border: "#30363d",     // The subtle gray border line wrapping the panel
        titleBg: "#161b22",    // The slightly darker background for the top header bar
        textDefault: "#c9d1d9",// Fallback color for standard line text
        dots: { 
            close: "#ff5f56",   // Retro red window action circle
            minimize: "#ffbd2e",// Retro yellow window action circle
            expand: "#27c93f"   // Retro green window action circle
        }
    }
};

// Export the themes blueprint so our generator file can access it
module.exports = themes;
