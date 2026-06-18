// index.js
const path = require('path');
const { compileStatusCard } = require('./src/generator');

/**
 * Main Local Test Operational Runner
 * Points directly to your personal data profile reference blueprint
 */
async function main() {
    try {
        console.log("Initializing status-box compiler engine layout...");
        
        // Match the absolute local path straight to your personal JSON data profile
        const targetProfilePath = path.join(__dirname, 'data/profiles/dev-sahad.json');
        
        // Execute the compilation engine routine
        await compileStatusCard(targetProfilePath);
        
        console.log("Execution pipeline finished flawlessly! Check your assets/outputs/ folder.");
    } catch (error) {
        console.error("Critical: Execution pipeline failed processing layout blueprint:", error.message);
        process.exit(1);
    }
}

// Trigger the runner execution block
main();

