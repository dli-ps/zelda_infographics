// services/geminiService.ts

import { ZeldaGame } from "../types";

export const fetchZeldaData = async (): Promise<ZeldaGame[]> => {
 // Updated to use local file paths from the 'assets/box-art' folder.
 const data: ZeldaGame[] = [
  {
    "title": "The Legend of Zelda: Four Swords Adventures",
    "year": 2004,
    "naSales": 0.76,
    "platform": "GC",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/5/56/The_Legend_of_Zelda_Four_Swords_Adventures_Game_Cover.jpg"
  },
  {
    "title": "The Legend of Zelda: Tri Force Heroes",
    "year": 2015,
    "naSales": 1.36,
    "platform": "3DS",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/d/db/The_Legend_of_Zelda_Tri_Force_Heroes_Boxart.jpg"
  },
  {
    "title": "The Legend of Zelda: The Minish Cap",
    "year": 2004,
    "naSales": 1.76,
    "platform": "GBA",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/0/0a/TLOZ-_Minish_Cap_NA_Box_art.png"
  },
  {
    "title": "The Legend of Zelda: Spirit Tracks",
    "year": 2009,
    "naSales": 2.96,
    "platform": "DS",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/it/9/93/Spirit-Tra.jpg"
  },
  {
    "title": "The Legend of Zelda: Oracle of Seasons & Oracle of Ages",
    "year": 2001,
    "naSales": 3.99,
    "platform": "GBC",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/4/47/The_Legend_of_Zelda_Oracle_of_Seasons_and_Oracle_of_Ages_Game_Cover.png"
  },
  {
    "title": "The Legend of Zelda: Echoes of Wisdom",
    "year": 2024,
    "naSales": 4.09,
    "platform": "Switch",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/1/1e/The_Legend_of_Zelda_%E2%80%93_Echoes_of_Wisdom.jpg"
  },
  {
    "title": "The Legend of Zelda: A Link Between Worlds",
    "year": 2013,
    "naSales": 4.26,
    "platform": "3DS",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/1/1b/The_Legend_of_Zelda_A_Link_Between_Worlds_NA_cover.jpg"
  },
  {
    "title": "The Legend of Zelda: Phantom Hourglass",
    "year": 2007,
    "naSales": 4.76,
    "platform": "DS",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/5/5e/The_Legend_of_Zelda_Phantom_Hourglass_Game_Cover.jpg"
  },
  {
    "title": "Zelda II: The Adventure of Link",
    "year": 1987,
    "naSales": 4.97,
    "platform": "NES",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/f/fd/Zelda_II_The_Adventure_of_Link_box.jpg"
  },
  {
    "title": "The Legend of Zelda: The Wind Waker",
    "year": 2003,
    "naSales": 6.8,
    "platform": "GC",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg"
  },
  {
    "title": "The Legend of Zelda: Majora's Mask",
    "year": 2000,
    "naSales": 6.82,
    "platform": "N64",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"
  },
  {
    "title": "The Legend of Zelda: A Link to the Past",
    "year": 1992,
    "naSales": 7.43,
    "platform": "SNES",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg"
  },
  {
    "title": "The Legend of Zelda",
    "year": 1986,
    "naSales": 7.54,
    "platform": "NES",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png"
  },
  {
    "title": "The Legend of Zelda: Skyward Sword",
    "year": 2011,
    "naSales": 7.82,
    "platform": "Wii",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/9/99/Legend_of_Zelda_Skyward_Sword_boxart.png"
  },
  {
    "title": "The Legend of Zelda: Twilight Princess",
    "year": 2006,
    "naSales": 10.1,
    "platform": "Wii",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/0/0e/The_Legend_of_Zelda_Twilight_Princess_Game_Cover.jpg"
  },
  {
    "title": "The Legend of Zelda: Link's Awakening",
    "year": 1993,
    "naSales": 12.68,
    "platform": "GB",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/c/c1/Link%27s_Awakening.png"
  },
  {
    "title": "The Legend of Zelda: Ocarina of Time",
    "year": 1998,
    "naSales": 14.6,
    "platform": "N64",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/5/57/The_Legend_of_Zelda_Ocarina_of_Time.jpg"
  },
  {
    "title": "The Legend of Zelda: Tears of the Kingdom",
    "year": 2023,
    "naSales": 22.19,
    "platform": "Switch",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg"
  },
  {
    "title": "The Legend of Zelda: Breath of the Wild",
    "year": 2017,
    "naSales": 35.08,
    "platform": "Switch",
    "boxArtUrl": "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
  }
 ];
 data.sort((a, b) => a.naSales - b.naSales);
 return Promise.resolve(data);
};