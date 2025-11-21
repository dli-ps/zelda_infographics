import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // You will need to install 'node-fetch'
import { fetchZeldaData } from './services/geminiService.js';

// Configuration
const ASSETS_DIR = path.join(process.cwd(), 'assets/box-art');

/**
 * Downloads a file from a URL and saves it to a local path.
 * @param {string} url The remote URL of the file.
 * @param {string} filePath The local path to save the file.
 */
const downloadFile = async (url, filePath) => {
  // Fix for Wikia/Fandom URLs that include resolution parameters
  const cleanUrl = url.split('/revision/')[0];
  
  // Determine file extension
  const extension = path.extname(cleanUrl) || '.png';
  const finalPath = filePath + extension;

  try {
    const response = await fetch(cleanUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${cleanUrl}: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    await fs.promises.writeFile(finalPath, Buffer.from(arrayBuffer));
    return path.relative(process.cwd(), finalPath).replace(/\\/g, '/'); // Return local path for consumption
  } catch (error) {
    console.error(`[ERROR] Could not download ${cleanUrl}:`, error.message);
    // Return a placeholder string in case of failure
    return 'assets/placeholder.png'; 
  }
};

const setupAssets = async () => {
  console.log('Starting asset download and data preparation...');
  
  // 1. Create the assets directory if it doesn't exist
  if (!fs.existsSync(ASSETS_DIR)) {
    await fs.promises.mkdir(ASSETS_DIR, { recursive: true });
    console.log(`Created directory: ${ASSETS_DIR}`);
  }

  // 2. Fetch the data
  const originalData = await fetchZeldaData();

  // 3. Process and download each game's box art
  const updatedData = [];
  for (const game of originalData) {
    // Generate a clean filename (e.g., 'ocarina_of_time')
    const filenameBase = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const localFilePathBase = path.join(ASSETS_DIR, filenameBase);

    // Download the image and get the local asset path
    const localAssetPath = await downloadFile(game.boxArtUrl, localFilePathBase);

    // Update the game object with the new local path
    updatedData.push({
      ...game,
      localBoxArt: localAssetPath, // New field for Remotion
    });
  }

  // 4. Save the final data with local paths to a JSON file
  const dataPath = path.join(ASSETS_DIR, 'final-data.json');
  await fs.promises.writeFile(dataPath, JSON.stringify(updatedData, null, 2));
  
  console.log(`\n✅ Successfully downloaded ${updatedData.length} box art files.`);
  console.log(`   Final data saved to: ${dataPath}`);
  console.log('   The local path to use in Remotion is:', path.relative(process.cwd(), dataPath).replace(/\\/g, '/'));
};

setupAssets().catch(console.error);