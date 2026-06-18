// src/validator.js
const fs = require('fs');
const path = require('path');

/**
 * Validates a submitted profile JSON file against explicit platform design rules.
 * Throws clean exceptions if structural or data boundaries are broken.
 */
function validateProfile(filePath) {
    const fileName = path.basename(filePath);
    console.log(`\n🔍 Linting profile validation payload: ${fileName}`);

    // 1. Check if file is actually a JSON file
    if (!filePath.endsWith('.json')) {
        throw new Error(`Invalid file extension. Profiles must be strictly JSON format.`);
    }

    // 2. Read and parse file safely
    const rawData = fs.readFileSync(filePath, 'utf8');
    let data;
    try {
        data = JSON.parse(rawData);
    } catch (e) {
        throw new Error(`Malformed JSON structure. Please fix structural syntax syntax.`);
    }

    // 3. Enforce username naming convention (matches filename)
    const expectedUsername = path.basename(filePath, '.json');
    if (!data.username || data.username.toLowerCase() !== expectedUsername.toLowerCase()) {
        throw new Error(`Field "username" must match the file name: "${expectedUsername}"`);
    }

    // 4. Validate header title constraints
    if (!data.title || data.title.length > 30) {
        throw new Error(`Field "title" is missing or exceeds maximum limit of 30 characters.`);
    }

    // 5. Validate status line metrics
    if (!Array.isArray(data.lines) || data.lines.length === 0) {
        throw new Error(`Profile must contain a "lines" array with at least one metric configuration.`);
    }
    
    if (data.lines.length > 8) {
        throw new Error(`Line limit exceeded. Maximum permissible status line entries is 8 rows.`);
    }

    // 6. Deep layer check for individual lines array attributes
    data.lines.forEach((line, index) => {
        if (!line.label || !line.value) {
            throw new Error(`Line index [${index}] is missing required "label" or "value" configurations.`);
        }
        if (line.label.length > 15) {
            throw new Error(`Line index [${index}] label "${line.label}" exceeds safe layout constraint of 15 chars.`);
        }
        if (line.value.length > 45) {
            throw new Error(`Line index [${index}] value exceeds safe layout constraint of 45 chars.`);
        }
        
        // Match standard 3, 4, 6, or 8 character hex colors cleanly
        if (line.color && !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(line.color)) {
            throw new Error(`Line index [${index}] color "${line.color}" is not a valid CSS hex structure color.`);
        }
    });

    console.log(`✅ Validation successful! ${fileName} meets all system design rules.`);
    return true;
}

module.exports = { validateProfile };

