// services/geminiService.ts

import { ZeldaGame } from "../types";

export const fetchZeldaData = async (): Promise<ZeldaGame[]> => {
 // Updated to use local file paths from the 'assets/box-art' folder.
 const data: ZeldaGame[] = [
  {
   "title": "The Legend of Zelda",
   "year": 1986,
   "naSales": 7.54,
   "platform": "NES",
   // Matches: TLoZ_NES_NA_Box.png
   "boxArtUrl": "TLoZ_NES_NA_Box.png"
  },
  {
   "title": "Zelda II: The Adventure of Link",
   "year": 1987,
   "naSales": 4.97,
   "platform": "NES",
   // Matches: TAoL_NA_NES_Box_Artwork.png
   "boxArtUrl": "TAoL_NA_NES_Box_Artwork.png"
  },
  {
   "title": "The Legend of Zelda: A Link to the Past",
   "year": 1992,
   "naSales": 7.43,
   "platform": "SNES",
   // Matches: Zelda_SNES.jpg
   "boxArtUrl": "Zelda_SNES.jpg"
  },
  {
   "title": "The Legend of Zelda: Link's Awakening",
   "year": 1993,
   "naSales": 12.68,
   "platform": "GB",
   // Matches: LANS_NA_Box_Art.png
   "boxArtUrl": "LANS_NA_Box_Art.png"
  },
  {
   "title": "The Legend of Zelda: Ocarina of Time",
   "year": 1998,
   "naSales": 14.6,
   "platform": "N64",
   // Matches: OoT_NA_Box.jpg
   "boxArtUrl": "OoT_NA_Box.jpg"
  },
  {
   "title": "The Legend of Zelda: Majora's Mask",
   "year": 2000,
   "naSales": 6.82,
   "platform": "N64",
   // Matches: Majora's_Mask_Standard_Edition_Box.jpg
   "boxArtUrl": "Majora's_Mask_Standard_Edition_Box.jpg"
  },
  {
   "title": "The Legend of Zelda: Oracle of Seasons & Oracle of Ages",
   "year": 2001,
   "naSales": 3.99,
   "platform": "GBC",
   // Matches: OoX_Limited_EU_Box.jpg
   "boxArtUrl": "OoX_Limited_EU_Box.jpg"
  },
  {
   "title": "The Legend of Zelda: The Wind Waker",
   "year": 2003,
   "naSales": 6.8,
   "platform": "GC",
   // Matches: TWWHD_Boxart.png
   "boxArtUrl": "TWWHD_Boxart.png"
  },
  {
   "title": "The Legend of Zelda: Four Swords Adventures",
   "year": 2004,
   "naSales": 0.76,
   "platform": "GC",
   // Matches: FourSwordsA_Box.jpg
   "boxArtUrl": "FourSwordsA_Box.jpg"
  },
  {
   "title": "The Legend of Zelda: The Minish Cap",
   "year": 2004,
   "naSales": 1.76,
   "platform": "GBA",
   // Matches: ZeldaMinishCap_BoxArt.jpg
   "boxArtUrl": "ZeldaMinishCap_BoxArt.jpg"
  },
  {
   "title": "The Legend of Zelda: Twilight Princess",
   "year": 2006,
   "naSales": 10.1,
   "platform": "Wii",
   // Matches: Twilight_Princess_GCN_US_boxart.jpg
   "boxArtUrl": "Twilight_Princess_GCN_US_boxart.jpg"
  },
  {
   "title": "The Legend of Zelda: Phantom Hourglass",
   "year": 2007,
   "naSales": 4.76,
   "platform": "DS",
   // Matches: Phantomhour.jpg
   "boxArtUrl": "Phantomhour.jpg"
  },
  {
   "title": "The Legend of Zelda: Spirit Tracks",
   "year": 2009,
   "naSales": 2.96,
   "platform": "DS",
   // Matches: Spirit_Tracks_Cover.jpg
   "boxArtUrl": "Spirit_Tracks_Cover.jpg"
  },
  {
   "title": "The Legend of Zelda: Skyward Sword",
   "year": 2011,
   "naSales": 7.82,
   "platform": "Wii",
   // Matches: Skyward_Sword_NA_Box.jpg
   "boxArtUrl": "Skyward_Sword_NA_Box.jpg"
  },
  {
   "title": "The Legend of Zelda: A Link Between Worlds",
   "year": 2013,
   "naSales": 4.26,
   "platform": "3DS",
   // Matches: A_Link_Between_Worlds_cover.jpg
   "boxArtUrl": "A_Link_Between_Worlds_cover.jpg"
  },
  {
   "title": "The Legend of Zelda: Tri Force Heroes",
   "year": 2015,
   "naSales": 1.36,
   "platform": "3DS",
   // Matches: TFH_NA_Box_Art.png
   "boxArtUrl": "TFH_NA_Box_Art.png"
  },
  {
   "title": "The Legend of Zelda: Breath of the Wild",
   "year": 2017,
   "naSales": 35.08,
   "platform": "Switch",
   // Matches: The_Legend_of_Zelda_Breath_of_the_Wild.jpg
   "boxArtUrl": "The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
  },
  {
   "title": "The Legend of Zelda: Tears of the Kingdom",
   "year": 2023,
   "naSales": 22.19,
   "platform": "Switch",
   // Matches: TotK_English_Box_Art.png
   "boxArtUrl": "TotK_English_Box_Art.png"
  },
  {
   "title": "The Legend of Zelda: Echoes of Wisdom",
   "year": 2024,
   "naSales": 4.09,
   "platform": "Switch",
   // Assuming the final file extension is .webp based on the original URL, 
   // or you can use .png if the downloader converted it.
      // Based on the listing, I will assume it's Echoes_of_Wisdom_Box_Art.webp.
   "boxArtUrl": "Echoes_of_Wisdom_Box_Art.png" 
  }
 ];

 return Promise.resolve(data);
};