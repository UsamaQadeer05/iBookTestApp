# IBookApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Setup Project Locally

To Setup this project locally you need run command `npm install --force` in your vs code or git bash terminal.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. Or you can directly run `ng s --o` it will automatically open `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Dependencies

Following dependencies are used to run this project:
1. Angular 15
2. Angular Material 15
3. ngx-quill
4. quill
5. @types/quill

## Functionalities Perform in this App

1. Routing
2. Reactive Form to send document to Friend
3. Validation's to submit valid data
4. API Calling to get word defination
5. Quill-Editor to prepare document
6. Display Submit record ton other page

## Free Dictionary API

To get word definations given `https://rapidapi.com/dpventures/api/wordsapi/` is unfortunately not working free, so I used an alternative
API `https://dictionaryapi.dev/`

How this dictionary API works?

Get word definitions
Usage : The basic syntax of a URL request to the API is shown below:

`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

As an example, to get definition of English word `hello`, you can send request to

`https://api.dictionaryapi.dev/api/v2/entries/en/hello`

Response will be:
`[
    {
      "word": "hello",
      "phonetic": "həˈləʊ",
      "phonetics": [
        {
          "text": "həˈləʊ",
          "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
        },
        {
          "text": "hɛˈləʊ"
        }
      ],
      "origin": "early 19th century: variant of earlier hollo ; related to holla.",
      "meanings": [
        {
          "partOfSpeech": "exclamation",
          "definitions": [
            {
              "definition": "used as a greeting or to begin a phone conversation.",
              "example": "hello there, Katie!",
              "synonyms": [],
              "antonyms": []
            }
          ]
        },
        {
          "partOfSpeech": "noun",
          "definitions": [
            {
              "definition": "an utterance of ‘hello’; a greeting.",
              "example": "she was getting polite nods and hellos from people",
              "synonyms": [],
              "antonyms": []
            }
          ]
        },
        {
          "partOfSpeech": "verb",
          "definitions": [
            {
              "definition": "say or shout ‘hello’.",
              "example": "I pressed the phone button and helloed",
              "synonyms": [],
              "antonyms": []
            }
          ]
        }
      ]
    }
]`

I only displayed few relevent information for this response by getting value from 0 index:
`{
    word: selectedText,
    phonetic: response[0].phonetic,
    definition: response[0].meanings[0].definitions[0].definition,
    example: response[0].meanings[0].definitions[0].example,
}`

## Visualize Implementation

I have recorded video to demonstrate what exactly this app is doing
`https://www.loom.com/share/014f396c2dbe44598ae18fbe9f44f9d5`

## Note

In case of facing every difficulties or queries. Please free to contact me