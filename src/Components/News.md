{
  "src/Components/News.js": {
    "description": "The News component that will be displayed on the right in every\nreact web application of [dictyBase](http://dictybase.org).",
    "methods": [],
    "props": {
      "posts": {
        "flowType": {
          "name": "Array",
          "elements": [
            {
              "name": "signature",
              "type": "object",
              "raw": "{\n  \"id\": number,\n  \"date\": number,\n  \"content\": string,\n  \"source\": string,\n}",
              "signature": {
                "properties": [
                  {
                    "key": "id",
                    "value": {
                      "name": "number",
                      "required": true
                    }
                  },
                  {
                    "key": "date",
                    "value": {
                      "name": "number",
                      "required": true
                    }
                  },
                  {
                    "key": "content",
                    "value": {
                      "name": "string",
                      "required": true
                    }
                  },
                  {
                    "key": "source",
                    "value": {
                      "name": "string",
                      "required": true
                    }
                  }
                ]
              }
            }
          ],
          "raw": "Array<{\n  \"id\": number,\n  \"date\": number,\n  \"content\": string,\n  \"source\": string,\n}>"
        },
        "required": true,
        "description": "List of news items"
      }
    }
  },
  "src/Components/Slideshow.js": {
    "description": "",
    "methods": [
      {
        "name": "next",
        "docblock": null,
        "modifiers": [],
        "params": [],
        "returns": null
      },
      {
        "name": "previous",
        "docblock": null,
        "modifiers": [],
        "params": [],
        "returns": null
      },
      {
        "name": "renderImages",
        "docblock": null,
        "modifiers": [],
        "params": [],
        "returns": null
      },
      {
        "name": "renderDots",
        "docblock": null,
        "modifiers": [],
        "params": [],
        "returns": null
      }
    ]
  },
  "src/Components/styles/NewsContainer.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/Danger.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/Header.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/Img.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/Link.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/ListItems.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/NewsBox.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/NewsContent.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/NewsDate.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/NewsMore.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/NewsSource.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/NewsTitle.js": {
    "description": "",
    "methods": []
  },
  "src/Components/styles/SourceTitle.js": {
    "description": "",
    "methods": []
  }
}