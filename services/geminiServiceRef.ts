import { GoogleGenAI, Type } from "@google/genai";
import { ZeldaGame } from "../types";

export const fetchZeldaData = async (): Promise<ZeldaGame[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Define the schema for strict JSON output
  const gameSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Full title of the game" },
        year: { type: Type.INTEGER, description: "Release year" },
        naSales: { type: Type.NUMBER, description: "Sales in millions of units (float). Parse from the text provided." },
        platform: { type: Type.STRING, description: "Original console platform. STRICTLY use one of these codes: NES, SNES, GB, GBC, N64, GBA, GC, DS, Wii, 3DS, Wii U, Switch, Switch 2" },
        boxArtUrl: { type: Type.STRING, description: "A valid HTTPS URL to the game's box art. Prioritize finding the NTSC/North American cover art URL." }
      },
      required: ["title", "year", "naSales", "platform"],
    }
  };

  const sourceData = `
    The Legend of Zelda	1986		Worldwide	7,540,636	
    The Legend of Zelda	1986	NES	Worldwide	6,510,000	[1]
    Zelda	1989	G&W	Worldwide	250,000	[2]
    Famicom Mini: Zelda no Densetsu	2004	GBA	Japan	217,636	[3]
    Classic NES Series: The Legend of Zelda	2004	GBA	USA	373,000	[4]
    Other	190,000*	[5]
    The Legend of Zelda	2006	Wii (VC)	Worldwide	Unknown	[6]
    2012	3DS (VC)	Worldwide
    Zelda II: The Adventure of Link	1987		Worldwide	4,971,800	
    Zelda II: The Adventure of Link	1987	NES	Worldwide	4,380,000	[1]
    Famicom Mini: Zelda 2	2004	GBA	Japan	139,800	[3]
    Classic NES Series: Zelda II	2004	GBA	USA	302,000	[4]
    2005	GBA	Other	150,000*	[7]
    Zelda II: The Adventure of Link	2007	Wii (VC)	Worldwide	Unknown	[8]
    2012	3DS (VC)	Worldwide
    2013	Wii U (VC)	Worldwide
    The Legend of Zelda: A Link to the Past	1992		Worldwide	7,430,000	
    The Legend of Zelda: A Link to the Past	1992	SNES	Worldwide	4,610,000	[1]
    The Legend of Zelda: A Link to the Past & Four Swords	2002	GBA	Worldwide	2,820,000
    The Legend of Zelda: A Link to the Past	2007	Wii (VC)	Worldwide	Unknown	[9]
    2014	Wii U (VC)	Worldwide
    2016	New 3DS (VC)	Worldwide
    The Legend of Zelda: Link's Awakening	1993		Worldwide	12,680,000	
    The Legend of Zelda: Link's Awakening	1993	GB	Worldwide	3,830,000	[1]
    The Legend of Zelda: Link's Awakening DX	1998	GBC	Worldwide	2,220,000
    The Legend of Zelda: Link's Awakening	2019	Switch	Worldwide	6,630,000
    The Legend of Zelda: Link's Awakening DX	2011	3DS (VC)	Worldwide	Unknown	[10]
    The Legend of Zelda: Ocarina of Time	1998		Worldwide	14,600,000	
    The Legend of Zelda: Ocarina of Time	1998	N64	Worldwide	7,600,000	[1]
    The Legend of Zelda: Ocarina of Time / Master Quest	2003	GCN	Worldwide	560,000	[11]
    The Legend of Zelda: Ocarina of Time	2007	Wii (VC)	Worldwide	Unknown	[12]
    2015	Wii U (VC)	Worldwide
    The Legend of Zelda: Ocarina of Time 3D	2011	3DS	Worldwide	6,440,000	[1]
    The Legend of Zelda: Majora's Mask	2000		Worldwide	6,820,000	
    The Legend of Zelda: Majora's Mask	2000	N64	Worldwide	3,360,000	[1]
    2009	Wii (VC)	Worldwide	Unknown	[13]
    The Legend of Zelda: Majora's Mask 3D	2015	3DS	Worldwide	3,460,000	[1]
    The Legend of Zelda: Majora's Mask	2016	Wii U (VC)	Worldwide	Unknown	[13]
    Oracle of Seasons & Oracle of Ages	2001		Worldwide	3,990,000	
    The Legend of Zelda: Oracle of Seasons and Ages	2001	GBC	Worldwide	3,990,000	[1]
    The Legend of Zelda: The Wind Waker	2003		Worldwide	6,800,000	
    The Legend of Zelda: The Wind Waker	2003	GCN	Worldwide	4,430,000	[1]
    The Legend of Zelda: The Wind Waker HD	2013	Wii U	Worldwide	2,370,000	[14]
    The Legend of Zelda: Four Swords Adventures	2004		Worldwide	758,399	
    The Legend of Zelda: Four Swords+	2004	GCN	Japan	127,399	[3]
    The Legend of Zelda: Four Swords Adventures	2004	GCN	USA	451,000	[4]
    2005	GCN	Other	180,000*	[15]
    The Legend of Zelda: The Minish Cap	2004		Worldwide	1,760,000	
    The Legend of Zelda: The Minish Cap	2004	GBA	Worldwide	1,760,000	[1]
    2011	3DS (VC)	Worldwide	Unknown	[16]
    2014	Wii U (VC)	Worldwide	[17]
    The Legend of Zelda: Twilight Princess	2006		Worldwide	10,100,000	
    The Legend of Zelda: Twilight Princess	2006	GCN	Worldwide	1,430,000*	[18]
    Wii	Worldwide	7,500,000	[18]
    The Legend of Zelda: Twilight Princess HD	2016	Wii U	Worldwide	1,170,000	[1]
    The Legend of Zelda: Phantom Hourglass	2007		Worldwide	4,760,000	
    The Legend of Zelda: Phantom Hourglass	2007	DS	Worldwide	4,760,000	[1]
    2015	Wii U (VC)	Worldwide	Unknown	[19]
    The Legend of Zelda: Spirit Tracks	2009		Worldwide	2,960,000	
    The Legend of Zelda: Spirit Tracks	2009	DS	Worldwide	2,960,000	[1]
    The Legend of Zelda: Skyward Sword	2011		Worldwide	7,820,000	
    The Legend of Zelda: Skyward Sword	2011	Wii	Worldwide	3,670,000	[1]
    2016	Wii U (VC)	Worldwide	Unknown	[20]
    The Legend of Zelda: Skyward Sword HD	2021	Switch	Worldwide	4,150,000	[21]
    The Legend of Zelda: A Link Between Worlds	2013		Worldwide	4,260,000	
    The Legend of Zelda: A Link Between Worlds	2013	3DS	Worldwide	4,260,000	[1]
    The Legend of Zelda: Tri Force Heroes	2015		Worldwide	1,360,000	
    The Legend of Zelda: Tri Force Heroes	2015	3DS	Worldwide	1,360,000	[1]
    The Legend of Zelda: Breath of the Wild	2017		Worldwide	35,080,679	
    The Legend of Zelda: Breath of the Wild	2017	Wii U	Worldwide	1,700,000	[14]
    Switch	Worldwide	33,340,000	[22]
    The Legend of Zelda: Breath of the Wild – Nintendo Switch 2 Edition	2025	Switch 2	Japan	40,679	[23]
    The Legend of Zelda: Tears of the Kingdom	2023		Worldwide	22,191,263	
    The Legend of Zelda: Tears of the Kingdom	2023	Switch	Worldwide	22,150,000	[22]
    The Legend of Zelda: Tears of the Kingdom – Nintendo Switch 2 Edition	2025	Switch 2	Japan	41,263	[23]
    The Legend of Zelda: Echoes of Wisdom	2024		Worldwide	4,090,000	
    The Legend of Zelda: Echoes of Wisdom	2024	Switch	Worldwide	4,090,000	[24]
  `;

  const prompt = `
    I will provide raw text containing sales data for 'The Legend of Zelda' series.
    
    YOUR TASK:
    1. Parse the text below to extract the Main Series games.
    2. For each unique game title, extract the TOTAL sales figure (often the top row for that game group). 
       If a Total is not explicitly labeled, sum the rows or take the main platform entry.
    3. Convert sales numbers to Millions (e.g., 7,540,636 -> 7.54).
    4. Assign the original platform code (NES, SNES, etc).
    5. For 'boxArtUrl', provide a valid URL for the North American box art. 
       You should simulate finding these on https://zelda.fandom.com/wiki/Gallery:Box_Art or use Wikimedia Commons URLs that match the NA covers.

    DATA SOURCE:
    ${sourceData}
    
    OUTPUT RULES:
    - Sort chronologically by Year.
    - Do not invent sales numbers; use the text provided.
    - Exclude "Switch 2" editions if they are minor regions (Japan only in text) unless it is the main platform.
    - Ensure 'Breath of the Wild' includes the massive Switch sales (33m+) + Wii U.
    - Ensure 'Tears of the Kingdom' is included.
    - Ensure 'Echoes of Wisdom' is included.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: gameSchema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    const data: ZeldaGame[] = JSON.parse(jsonText);
    return data;
  } catch (error) {
    console.error("Error fetching Zelda data:", error);
    throw error;
  }
};
