// pr-verify.js
const fs = require('fs');
const path = require('path');
const { validateProfile } = require('./src/validator');

/**
 * Scans the profile data repository sector and executes multi-file layout scanning
 */
function runPRVerification() {
    const profilesDir = path.join(__dirname, 'data/profiles');
    
    try {
        const files = fs.readdirSync(profilesDir);
        
        if (files.length === 0) {
            console.log("No profiles detected for evaluation.");
            return;
        }

        files.forEach(file => {
            const absolutePath = path.join(profilesDir, file);
            // Run strict validation protocol against every single file in the folder
            validateProfile(absolutePath);
        });

        console.log("\n🎉 All profiles passed CI gate evaluation successfully!");
    } catch (error) {
        console.error(`\n❌ CI Verification Pipeline Gate Blown: ${error.message}`);
        process.exit(1); // Exits with failure code to block the PR from being merged!
    }
}

runPRVerification();
