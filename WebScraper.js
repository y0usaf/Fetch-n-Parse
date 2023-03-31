/**
 * This is a simple web scraper tool that fetches data from a given URL and extracts
 * desired information using user-defined parsing rules.
 * 
 * The tool demonstrates skills in JavaScript, web scraping, and working with external libraries.
 * 
 * Dependencies:
 * - axios: A promise-based HTTP client for making HTTP requests
 * - cheerio: A library for working with HTML and XML documents, allowing jQuery-like syntax
 *
 * To install the dependencies, run:
 *   npm install axios cheerio
 *
 * Usage:
 *   1. Modify the `config` object in the `main` function to set the target URL and parsing rules.
 *   2. Run the script using `node web_scraper.js`.
 */

const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Fetches the content of a given URL using the axios library.
 *
 * @param {string} url - The URL to fetch the content from.
 * @returns {Promise<string>} - A promise resolving to the fetched content.
 */
async function fetchContent(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error);
    return '';
  }
}

/**
 * Parses the content using Cheerio and extracts the desired data based on the provided rules.
 *
 * @param {string} content - The HTML content to parse.
 * @param {Object} rules - An object defining the parsing rules.
 * @returns {Object} - An object containing the extracted data.
 */
function parseContent(content, rules) {
  const $ = cheerio.load(content);
  const extractedData = {};

  for (const [key, rule] of Object.entries(rules)) {
    if (rule.type === 'text') {
      extractedData[key] = $(rule.selector).text().trim();
    } else if (rule.type === 'attr') {
      extractedData[key] = $(rule.selector).attr(rule.attribute);
    } else if (rule.type === 'list') {
      const items = [];
      $(rule.selector).each((_, element) => {
        const itemData = parseContent($(element).html(), rule.itemRules);
        items.push(itemData);
      });
      extractedData[key] = items;
    }
  }

  return extractedData;
}

/**
 * Main function that sets the target URL, parsing rules, and runs the web scraper.
 */
async function main() {
  // Configure the target URL and parsing rules.
  const config = {
    url: 'https://example.com',
    rules: {
      title: {
        type: 'text',
        selector: 'h1'
      },
      imageUrl: {
        type: 'attr',
        selector: 'img.main-image',
        attribute: 'src'
      },
      items: {
        type: 'list',
        selector: '.item-list li',
        itemRules: {
          name: {
            type: 'text',
            selector: '.item-name'
          },
          price: {
            type: 'text',
            selector: '.item-price'
          }
        }
      }
    }
  };

  // Fetch and parse the content.
  const content = await fetchContent(config.url);
  const data = parseContent(content, config.rules);

  // Output the extracted data.
  console.log(data);
}

main();
