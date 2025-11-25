import json
import os

# --- 1. Define File Paths ---
# The script will now attempt to load data from this file.
input_file_path = "zelda_info.json"
output_file_path = "sorted_mario_games.json"

# Note: The 'mario_games.json' file must exist in the same directory
# containing the JSON data for this script to run correctly.

# --- 2. Load the JSON data from the input file ---
print(f"Attempting to load data from: {input_file_path}")
try:
    with open(input_file_path, 'r') as f:
        # json.load reads directly from the file object
        games_list = json.load(f)
except FileNotFoundError:
    print(f"Error: Input file '{input_file_path}' not found. Please ensure the file exists.")
    exit()
except json.JSONDecodeError as e:
    print(f"Error decoding JSON data in {input_file_path}: {e}")
    exit()

# --- 3. Sort the list of dictionaries ---
# Sort by 'salesNA' from lowest to highest (ascending order).
# The 'reverse=False' argument (which is the default) is now used.
sorted_games = sorted(games_list, key=lambda game: game['naSales'], reverse=False)

# --- 4. Write the sorted list back to the output file ---
try:
    with open(output_file_path, 'w') as f:
        # json.dump is used to write Python objects to a file.
        # 'indent=2' is used to format the output with 2 spaces for readability.
        # 'sort_keys=False' is used to maintain the internal key order of each game object (e.g., 'title' then 'year').
        json.dump(sorted_games, f, indent=2, sort_keys=False)

    print(f"\nSuccessfully sorted the data by 'salesNA' (ascending, lowest to highest) and saved it to: {output_file_path}")

except IOError as e:
    print(f"Error writing to file {output_file_path}: {e}")
    exit()