import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  const names: string[] = [
    "foo",
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Sulfuras, Hand of Ragnaros",
  ];

  const sellIns: number[] = [-1, 0, 1, 2, 6, 11];

  const qualities: number[] = [0, 1, 2, 49, 50];

  // Cartesian product of all possible inputs
  const parameters = <[[string, number, number]]>(
    [names, sellIns, qualities].reduce(
      (a, b) =>
        a
          .map((x) => b.map((y: string | number) => x.concat(y)))
          .reduce((a, b) => a.concat(b), [] as (string | number)[][]),
      [[]] as (string | number)[][],
    )
  );

  it.each(parameters)(
    "should update quality",
    (name: string, sellIn: number, quality: number) => {
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchSnapshot();
    },
  );
});
