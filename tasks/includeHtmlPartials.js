const fs = require('fs').promises;
const path = require('path');

// Directories
const sourceDir = 'path/to/your/html'; // Source directory of your HTML files
const partialsDir = 'path/to/your/partials'; // Directory where partials are stored
const outputDir = 'path/to/output'; // Directory to save processed files

// Function to include HTML partials
async function includeHtmlPartials() {
    try {
        const files = await fs.readdir(sourceDir);

        for (const file of files) {
            if (path.extname(file) === '.html') {
                let content = await fs.readFile(path.join(sourceDir, file), 'utf8');
                const regex = /<!--\s*include:\s*(.*?)\s*-->/g;

                let match;
                while ((match = regex.exec(content)) !== null) {
                    const partialPath = path.join(partialsDir, match[1]);
                    const partialContent = await fs.readFile(partialPath, 'utf8');
                    content = content.replace(match[0], partialContent);
                }

                await fs.writeFile(path.join(outputDir, file), content);
            }
        }

        console.log('HTML files processed with partials included.');
    } catch (error) {
        console.error('Error processing HTML files:', error);
    }
}

// At the end of includePartials.js
module.exports = includeHtmlPartials;