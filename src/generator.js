// src/generator.js
const fs = require('fs');
const path = require('path');
const themes = require('./themes');

/**
 * Reads a single user profile JSON, compiles it into a retro terminal SVG canvas,
 * and outputs the completed graphic directly into the assets branch directory.
 */
async function compileStatusCard(profilePath) {
    // 1. Read raw file contents and parse it safely into an object
    const rawData = fs.readFileSync(profilePath, 'utf8');
    const profile = JSON.parse(rawData);
    
    // 2. Extract theme color maps based on user settings
    const theme = themes[profile.theme] || themes["monochrome-dark"];
    
    // 3. Define rigid graphic dimension constraints
    const width = 520;
    const rowHeight = 24;
    const padding = 20;
    const headerHeight = 35;
    
    // Dynamically calculate final height based on the number of text lines
    const height = headerHeight + (profile.lines.length * rowHeight) + padding;

    // 4. Safely iterate through every status row to compute vertical text positions
    let textElements = '';
    profile.lines.forEach((line, index) => {
        // Calculate coordinate shifts cleanly along the vertical Y-axis
        const yPosition = headerHeight + padding + (index * rowHeight);
        textElements += `
        <text x="25" y="${yPosition}" font-family="JetBrains Mono, monospace" font-size="13" fill="${line.color || theme.textDefault}">
            <tspan font-weight="bold" fill="#888888">&gt; ${line.label}:</tspan> ${line.value}
        </text>`;
    });

    // 5. Structure raw, ultra-sharp injection-safe SVG layout code
    const svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;display=swap');
    </style>
    <rect width="${width}" height="${height}" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.5"/>
    
    <path d="M0 8C0 3.58172 3.58172 0 8 0H${width - 8}C${width - 3.58} 0 ${width} 3.58172 ${width} 8V35H0V8Z" fill="${theme.titleBg}"/>
    <circle cx="20" cy="17.5" r="6" fill="${theme.dots.close}"/>
    <circle cx="40" cy="17.5" r="6" fill="${theme.dots.minimize}"/>
    <circle cx="60" cy="17.5" r="6" fill="${theme.dots.expand}"/>
    
    <text x="${width / 2}" y="22" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">${profile.title}</text>
    
    ${textElements}
</svg>`.trim();

    // 6. Guarantee destination folders exist before writing out files
    const outputDir = path.join(__dirname, '../assets/outputs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 7. Commit final graphic asset directly to storage directories
    const outputFilePath = path.join(outputDir, `${profile.username.toLowerCase()}.svg`);
    fs.writeFileSync(outputFilePath, svgContent);
    
    console.log(`Successfully compiled high-end card for ${profile.username}`);
}

module.exports = { compileStatusCard };
