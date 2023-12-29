const fs = require('fs').promises;
const path = require('path');

// Directories
const sourceDirectory = path.join(__dirname, 'src');
const destinationDirectory = path.join(__dirname, 'dist');
const jsDestinationDirectory = path.join(__dirname, 'dist', 'js');

/*************************
  ASSET PATHS
**************************/

//HTML ASSET PATH FUNCTION
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

// Asset Mappings
const assetMapping = {
  '../js/': './js/',
  '../../dist/css': './css',
  '../img/': './img/',
  './img/': './img/',
  '../site.webmanifest':'site.webmanifest',
};

// Update
updateAssetPaths(destinationDirectory, assetMapping);

//JS ASSET PATH FUNCTION
async function updateJsAssetPaths(jsDir, assetMapping) {
  try {
    const items = await fs.readdir(jsDir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(jsDir, item.name);
      if (item.isDirectory()) {
        // Recursively update paths in subdirectories
        await updateJsAssetPaths(fullPath, assetMapping);
      } else if (path.extname(item.name) === '.js') {
        let jsContent = await fs.readFile(fullPath, 'utf8');
        // Replace each asset path in the JavaScript content
        for (const [oldPath, newPath] of Object.entries(assetMapping)) {
          // This regex now includes quotation marks to match strings
          const regex = new RegExp(`"${oldPath}`, 'g');
          jsContent = jsContent.replace(regex, `"${newPath}`);
        }
        await fs.writeFile(fullPath, jsContent);
      }
    }
    console.log('Asset paths updated in JavaScript files.');
  } catch (error) {
    console.error('Error updating asset paths in JavaScript files:', error);
  }
}

const jsAssetMapping = {
  '../img/': 'img/',
};

// Update
updateJsAssetPaths(jsDestinationDirectory, jsAssetMapping);


/*************************
  COPY FILES
**************************/

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
  //console.log(`Files${fileIdentifier ? ' matching ' + fileIdentifier : ''} have been copied successfully from ${sourceDir} to ${targetDir}.`);
}

//HTML
const sourceHtmlDirectory = path.join(sourceDirectory, 'html');
copyFiles(sourceHtmlDirectory, destinationDirectory, '.html');

// Web Manifest and Robots.txt
copyFiles(sourceDirectory, destinationDirectory, 'site.webmanifest');
copyFiles(sourceDirectory, destinationDirectory, 'robots.txt');

// JS Files
const sourceJavascriptDirectory = path.join(__dirname, 'src', 'js');
const destinationJavascriptDirectory = path.join(__dirname, 'dist', 'js');
copyFiles(sourceJavascriptDirectory, destinationJavascriptDirectory)

// Images
const sourceImageDirectory = path.join(__dirname, 'src', 'img');
const destinationImageDirectory = path.join(__dirname, 'dist', 'img');
copyFiles(sourceImageDirectory, destinationImageDirectory);

// Fonts
const sourceFontsDirectory = path.join(__dirname, 'src', 'fonts', 'cera');
const destinationFontsDirectory = path.join(__dirname, 'dist', 'fonts', 'cera');
copyFiles(sourceFontsDirectory, destinationFontsDirectory);