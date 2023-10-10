import fs from "fs";
import { Item, GildedRose } from "./gilded-rose";

// Set constants
const API_URL = "https://yesno.wtf/api";
const POSITIVE_ANSWER = "yes";
const LOG_FILE = "log.txt";

// Create API response type
type ApiResponse = {
  answer: string;
  forced: boolean;
  image: string;
};

// Check if enough arguments are provided
if (process.argv.length < 4) {
  throw new Error("Not enough arguments provided!");
}

// Parse arguments
const updates = parseInt(process.argv[2]);
const requests = parseInt(process.argv[3]);

if (isNaN(updates) || isNaN(requests)) {
  throw new Error("Arguments must be integers!");
}

// Create items
const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 6),
];

// Create a Gilded Rose's shop instance
const gildedRose = new GildedRose(items);

const makeRequests = async (requests: number, toLog: boolean) => {
  const promises: Promise<void>[] = [];
  let positiveAnswers = 0;

  // Prepare requests
  for (let j = 0; j < requests; j++) {
    promises.push(
      fetch(API_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(String(response.status));
          }
          return response.json();
        })
        .then((json) => {
          const { answer } = json as ApiResponse;
          if (answer === POSITIVE_ANSWER) {
            positiveAnswers++;
          }
        }),
    );
  }

  // Wait for all requests to finish
  await Promise.all(promises);

  if (toLog) {
    // Log the amount of positive answers
    const stream = fs.createWriteStream(LOG_FILE, { flags: "a" });
    stream.write(`${positiveAnswers}\n`);
    stream.end();
  }

  return positiveAnswers;
};

// Remove log file if it exists
fs.unlink(LOG_FILE, () => {});

void (async () => {
  for (let i = 0; i < updates; i++) {
    let positiveAnswers = await makeRequests(requests, true);

    while (positiveAnswers > 0) {
      positiveAnswers = await makeRequests(positiveAnswers, false);
    }

    gildedRose.updateQuality();
  }
})();
