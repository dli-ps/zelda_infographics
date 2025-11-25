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
    "boxArtUrl": "FourSwordsA_Box.jpg"
  },
  {
    "title": "The Legend of Zelda: Tri Force Heroes",
    "year": 2015,
    "naSales": 1.36,
    "platform": "3DS",
    "boxArtUrl": "TFH_NA_Box_Art.png"
  },
  {
    "title": "The Legend of Zelda: The Minish Cap",
    "year": 2004,
    "naSales": 1.76,
    "platform": "GBA",
    "boxArtUrl": "ZeldaMinishCap_BoxArt.jpg"
  },
  {
    "title": "The Legend of Zelda: Spirit Tracks",
    "year": 2009,
    "naSales": 2.96,
    "platform": "DS",
    "boxArtUrl": "Spirit_Tracks_Cover.jpg"
  },
  {
    "title": "The Legend of Zelda: Oracle of Seasons & Oracle of Ages",
    "year": 2001,
    "naSales": 3.99,
    "platform": "GBC",
    "boxArtUrl": "OoX_Limited_EU_Box.jpg"
  },
  {
    "title": "The Legend of Zelda: Echoes of Wisdom",
    "year": 2024,
    "naSales": 4.09,
    "platform": "Switch",
    "boxArtUrl": "Echoes_of_Wisdom_Box_Art.png"
  },
  {
    "title": "The Legend of Zelda: A Link Between Worlds",
    "year": 2013,
    "naSales": 4.26,
    "platform": "3DS",
    "boxArtUrl": "A_Link_Between_Worlds_cover.jpg"
  },
  {
    "title": "The Legend of Zelda: Phantom Hourglass",
    "year": 2007,
    "naSales": 4.76,
    "platform": "DS",
    "boxArtUrl": "Phantomhour.jpg"
  },
  {
    "title": "Zelda II: The Adventure of Link",
    "year": 1987,
    "naSales": 4.97,
    "platform": "NES",
    "boxArtUrl": "TAoL_NA_NES_Box_Artwork.png"
  },
  {
    "title": "The Legend of Zelda: The Wind Waker",
    "year": 2003,
    "naSales": 6.8,
    "platform": "GC",
    "boxArtUrl": "TWWHD_Boxart.png"
  },
  {
    "title": "The Legend of Zelda: Majora's Mask",
    "year": 2000,
    "naSales": 6.82,
    "platform": "N64",
    "boxArtUrl": "Majora's_Mask_Standard_Edition_Box.jpg"
  },
  {
    "title": "The Legend of Zelda: A Link to the Past",
    "year": 1992,
    "naSales": 7.43,
    "platform": "SNES",
    "boxArtUrl": "Zelda_SNES.jpg"
  },
  {
    "title": "The Legend of Zelda",
    "year": 1986,
    "naSales": 7.54,
    "platform": "NES",
    "boxArtUrl": "TLoZ_NES_NA_Box.png"
  },
  {
    "title": "The Legend of Zelda: Skyward Sword",
    "year": 2011,
    "naSales": 7.82,
    "platform": "Wii",
    "boxArtUrl": "Skyward_Sword_NA_Box.jpg"
  },
  {
    "title": "The Legend of Zelda: Twilight Princess",
    "year": 2006,
    "naSales": 10.1,
    "platform": "Wii",
    "boxArtUrl": "Twilight_Princess_GCN_US_boxart.jpg"
  },
  {
    "title": "The Legend of Zelda: Link's Awakening",
    "year": 1993,
    "naSales": 12.68,
    "platform": "GB",
    "boxArtUrl": "LANS_NA_Box_Art.png"
  },
  {
    "title": "The Legend of Zelda: Ocarina of Time",
    "year": 1998,
    "naSales": 14.6,
    "platform": "N64",
    "boxArtUrl": "OoT_NA_Box.jpg"
  },
  {
    "title": "The Legend of Zelda: Tears of the Kingdom",
    "year": 2023,
    "naSales": 22.19,
    "platform": "Switch",
    "boxArtUrl": "TotK_English_Box_Art.png"
  },
  {
    "title": "The Legend of Zelda: Breath of the Wild",
    "year": 2017,
    "naSales": 35.08,
    "platform": "Switch",
    "boxArtUrl": "The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
  }
 ];
 data.sort((a, b) => a.naSales - b.naSales);
 return Promise.resolve(data);
};