# Fetch 'n' Parse

Fetch 'n' Parse is a simple, user-friendly web scraping tool that allows you to extract data from any website using custom parsing rules. With its intuitive interface, you can configure the scraping process by providing a URL and a set of rules in JSON format.

## Features

- Customizable rules for data extraction
- Supports text and attribute extraction, as well as nested lists
- Real-time display of extracted data
- Built with HTML, CSS, and vanilla JavaScript
- No server-side code or database required

## Getting Started

1. Clone or download the repository.
2. Open the `Fetch_n_Parse.html` file in your web browser.

## Usage

1. Enter the URL of the website you want to scrape.
2. Define your parsing rules in the JSON format in the provided textarea. The rules should include the type of data to extract (text, attribute, or list), the CSS selector for the target element(s), and any additional information needed (e.g., the attribute name for attribute extraction).
3. Click the "Start Scraping" button to fetch and parse the content of the specified URL.
4. The extracted data will be displayed in real-time in the output area.

## Example

Here's an example of parsing rules that can be used to extract the title, and a list of items with their names, prices, and images from a website:

    {
      "title": {
        "type": "text",
        "selector": "h1"
      },
      "items": {
        "type": "list",
        "selector": ".thumbnail",
        "itemRules": {
          "name": {
            "type": "text",
            "selector": ".caption > h4 > a"
          },
          "price": {
            "type": "text",
            "selector": ".price"
          },
          "image": {
            "type": "attr",
            "selector": "img",
            "attribute": "src"
          }
        }
      }
    }
## Limitations

Due to CORS (Cross-Origin Resource Sharing) restrictions, you may encounter a "NetworkError when attempting to fetch resource" error when trying to fetch content from some websites. To resolve this issue, you can use a CORS proxy as an intermediary between your web application and the target website.

Please note that using a CORS proxy may have security and privacy implications. Make sure to use a trustworthy CORS proxy and only fetch content from reliable sources.
License

Fetch 'n' Parse is released under the [MIT License.](https://opensource.org/license/mit/)