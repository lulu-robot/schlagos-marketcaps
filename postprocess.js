// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const existingJsonFileName = `market-cap-postprocessed.json`
const oldjson = await readJSON(existingJsonFileName)
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const marketCaps = Object.values(json); // convert property values into an array
const filteredMarketCaps = marketCaps.map(rate => ({ 
    id: rate.id,
    symbol: rate.symbol,
  name: rate.name,
  image: rate.image,
  market_cap: rate.market_cap,
}));
const oldMarketCaps = Object.values(oldjson)

oldMarketCaps.push({
    date: Date.now(),
    data: filteredMarketCaps
})

// Step 3. Write a new JSON file with our filtered data
const newFilename = `market-cap-postprocessed.json` // name of a new file to be saved
await writeJSON(newFilename, oldMarketCaps) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")

// Optionally delete the original file
await removeFile('./market-caps.json') // equivalent to removeFile('btc-price.json')
