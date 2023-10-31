const fs = require('fs').promises;
const path = require('path');

async function copyFiles(sourceDir, targetDir, fileIdentifier) {
  await fs.mkdir(targetDir, { recursive: true });

  const items = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item.name);
    const targetPath = path.join(targetDir, item.name);

    if (item.isDirectory()) {
      // If fileIdentifier is not set, copy the whole directory
      if (!fileIdentifier) {
        await copyFiles(sourcePath, targetPath);
      }
      // Otherwise, skip the directory
    } else {
      // Check if the file matches the fileIdentifier (if one is provided)
      if (!fileIdentifier || path.extname(item.name) === fileIdentifier || item.name === fileIdentifier) {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }

  console.log(`Files${fileIdentifier ? ' matching ' + fileIdentifier : ''} have been copied successfully from ${sourceDir} to ${targetDir}.`);
}

async function updateAssetPaths(htmlDir, assetMapping) {
  try {
    const files = await fs.readdir(htmlDir);

    for (const file of files) {
      if (path.extname(file) === '.html') {
        let html = await fs.readFile(path.join(htmlDir, file), 'utf8');

        // Replace each asset path in the HTML
        for (const [oldPath, newPath] of Object.entries(assetMapping)) {
          const regex = new RegExp(oldPath, 'g');
          html = html.replace(regex, newPath);
        }

        await fs.writeFile(path.join(htmlDir, file), html);
      }
    }
    console.log('Asset paths updated in HTML files.');
  } catch (error) {
    console.error('Error updating asset paths:', error);
  }
};

// Usage
const sourceDirectory = path.join(__dirname, 'src');
const destinationDirectory = path.join(__dirname, 'dist');

//HTML
const sourceHtmlDirectory = path.join(sourceDirectory, 'html');
// Copy all HTML files
copyFiles(sourceHtmlDirectory, destinationDirectory, '.html');

// Define your asset mappings
const assetMapping = {
  // Here, define the old paths as they are in your source HTML files,
  // and the new paths as they should be in the distribution HTML files.
  // For example:
  '../js/': './js/',
  '../../dist/css': './css',
  '../img/': './img/',
  '/src/img/': '/img/',
  '../site.webmanifest':'site.webmanifest',
  // Add more mappings as needed
};

// Then, update asset paths in the HTML files now present in `dist` directory
updateAssetPaths(destinationDirectory, assetMapping);

// Copy specific files by name
copyFiles(sourceDirectory, destinationDirectory, 'site.webmanifest');
copyFiles(sourceDirectory, destinationDirectory, 'robots.txt');

// Copy Utility files
copyFiles(sourceDirectory, destinationDirectory, 'site.webmanifest');
copyFiles(sourceDirectory, destinationDirectory, 'robots.txt');

// Define the source and target directories
const sourceJavascriptDirectory = path.join(__dirname, 'src', 'js');
const destinationJavascriptDirectory = path.join(__dirname, 'dist', 'js');

// Call the function to copy all contents of the source Javascript directory
copyFiles(sourceJavascriptDirectory, destinationJavascriptDirectory)

const sourceImageDirectory = path.join(__dirname, 'src', 'img');
const destinationImageDirectory = path.join(__dirname, 'dist', 'img');
// Copy all image files
copyFiles(sourceImageDirectory, destinationImageDirectory);

const sourceFontsDirectory = path.join(__dirname, 'src', 'fonts', 'cera');
const destinationFontsDirectory = path.join(__dirname, 'dist', 'fonts', 'cera');
// Copy all font files
copyFiles(sourceFontsDirectory, destinationFontsDirectory);
