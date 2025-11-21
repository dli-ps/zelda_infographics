import os
import json
import re
from pathlib import Path
from urllib.parse import urlparse
import requests

# --- Configuration ---
# Set the base directory for assets relative to the current working directory
ASSETS_DIR = Path(os.getcwd()) / 'assets' / 'box-art'

# --- Placeholder for fetchZeldaData ---
# Since Python can't directly run the JS module, we'll recreate the static data
# The actual data should come from your Python equivalent of './services/geminiService.js'
def fetch_zelda_data():
    """
    Placeholder function to return the static Zelda game data.
    Replace this with actual data fetching if needed.
    """
    data = [
        # ... (Insert the full list of Zelda game objects here) ...
        {
          "title": "The Legend of Zelda",
          "year": 1986,
          "naSales": 7.54,
          "platform": "NES",
          "boxArtUrl": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/0c/TLoZ_NES_NA_Box.png/revision/latest?cb=20170404023020"
        },
        {
          "title": "Zelda II: The Adventure of Link",
          "year": 1987,
          "naSales": 4.97,
          "platform": "NES",
          "boxArtUrl": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/33/TAoL_NA_NES_Box_Artwork.png/revision/latest?cb=20180104183449&format=original"
        },
        {
          "title": "The Legend of Zelda: Tears of the Kingdom",
          "year": 2023,
          "naSales": 22.19,
          "platform": "Switch",
          "boxArtUrl": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/26/TotK_English_Box_Art.png/revision/latest/scale-to-width-down/1000?cb=20230727095127&format=original"
        }
        # ... (rest of the data) ...
    ]
    return data

# --- Core Functions ---

def download_file(url, file_path_base):
    """
    Downloads a file from a URL and saves it to a local path.
    """
    # Fix for Wikia/Fandom URLs that include resolution parameters
    clean_url = url.split('/revision/')[0]
    
    # Get the file extension from the clean URL path
    parsed_url = urlparse(clean_url)
    extension = os.path.splitext(parsed_url.path)[1] or '.png'
    
    final_path = file_path_base.with_suffix(extension)
    
    try:
        # Use requests for fetching data
        response = requests.get(clean_url, stream=True, timeout=10)
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

        # Write content to file
        with open(final_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        # Return local path string for Remotion (using forward slashes)
        return str(final_path.relative_to(Path.cwd())).replace('\\', '/')
    
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Could not download {clean_url}: {e}")
        # Return a placeholder path on failure
        return 'assets/placeholder.png'

def setup_assets():
    print('Starting asset download and data preparation...')

    # 1. Create the assets directory if it doesn't exist
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Created directory: {ASSETS_DIR}")

    # 2. Fetch the data
    original_data = fetch_zelda_data()

    # 3. Process and download each game's box art
    updated_data = []
    for game in original_data:
        # Generate a clean filename (e.g., 'ocarina_of_time')
        filename_base = re.sub(r'[^a-z0-9]+', '_', game['title'].lower())
        local_file_path_base = ASSETS_DIR / filename_base

        # Download the image and get the local asset path
        local_asset_path = download_file(game['boxArtUrl'], local_file_path_base)

        # Update the game object with the new local path
        updated_data.append({
            **game,
            'localBoxArt': local_asset_path, # New field for Remotion
        })

    # 4. Save the final data with local paths to a JSON file
    data_path = ASSETS_DIR / 'final-data.json'
    with open(data_path, 'w') as f:
        json.dump(updated_data, f, indent=2)

    print(f"\n✅ Successfully downloaded {len(updated_data)} box art files.")
    print(f"   Final data saved to: {data_path}")
    print('   The local path to use in Remotion is:', str(data_path.relative_to(Path.cwd())).replace('\\', '/'))


if __name__ == '__main__':
    setup_assets()