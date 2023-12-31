// This class cannot be altered
/* eslint-disable */
// prettier-ignore-start
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
/* eslint-enable */
// prettier-ignore-end

const MAX_QUALITY = 50;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map((item) => {
      let qualityChange: number;

      switch (true) {
        case item.name == "Sulfuras, Hand of Ragnaros":
          return item;

        case item.name == "Aged Brie":
          item.sellIn--;
          qualityChange = item.sellIn < 0 ? 2 : 1;
          item.quality = Math.min(item.quality + qualityChange, MAX_QUALITY);

          return item;

        case item.name == "Backstage passes to a TAFKAL80ETC concert":
          qualityChange = item.sellIn < 6 ? 3 : item.sellIn < 11 ? 2 : 1;
          item.sellIn--;
          item.quality =
            item.sellIn < 0
              ? 0
              : Math.min(item.quality + qualityChange, MAX_QUALITY);

          return item;

        case item.name.startsWith("Conjured"):
          item.sellIn--;
          qualityChange = item.sellIn < 0 ? 4 : 2;
          item.quality = Math.max(item.quality - qualityChange, 0);

          return item;

        default:
          item.sellIn--;
          qualityChange = item.sellIn < 0 ? 2 : 1;
          item.quality = Math.max(item.quality - qualityChange, 0);

          return item;
      }
    });
  }
}
