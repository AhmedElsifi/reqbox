# Reqbox

An interactive terminal HTTP client built with Node.js. Make requests, inspect responses, and keep a local history — all without leaving the command line.

## Installation

```bash
git clone https://github.com/your-username/reqbox.git
cd reqbox
npm install
```

## Usage

```bash
npm start
```

Or install globally:

```bash
npm install -g .
reqbox
```

### Main Menu

```
╭─────────────────────────────────────────╮
│                                         │
│                 REQBOX                  │
│         Interactive HTTP Client         │
│                                         │
│   Make HTTP requests from your terminal │
│                                         │
╰─────────────────────────────────────────╯

? What would you like to do?
❯ New Request
  Request History
  Exit
```

### Making a Request

1. Select an HTTP method (GET, POST, PUT, PATCH, DELETE)
2. Enter a server URL (defaults to `http://localhost:3000`)
3. Enter a route (defaults to `/`)
4. Optionally add query parameters
5. Optionally add custom headers
6. Optionally add a JSON body (for POST, PUT, PATCH, DELETE)
7. View the formatted response

### Example

```
REQBOX > New Request

? Select HTTP method: POST
? Enter server URL: http://localhost:3000
? Enter route: /users
? Add query parameters? No
? Add custom headers? Yes
? Header name: Authorization
? Header value: Bearer token123
? Add another header? No
? Add a request body? Yes
? Enter JSON body: {"name": "Ahmed", "age": 20}

╭──────────────────────────────────────────────────────╮
│ Request                                              │
│ POST http://localhost:3000/users                     │
│                                                      │
│ Response                                             │
│ 201 Created                                          │
│                                                      │
│ Body                                                 │
│ {                                                    │
│   "id": 1,                                           │
│   "name": "Ahmed",                                   │
│   "age": 20                                          │
│ }                                                    │
╰──────────────────────────────────────────────────────╯
```

### Request History

All requests are saved to `~/.reqbox/history.json`. From the main menu, select **Request History** to:

- View past requests with method, URL, status, and timestamp
- Resend a saved request
- Edit a saved request before resending
- Delete individual entries

## Project Structure

```
src/
├── app.js                  # Entry point and main loop
├── history/
│   └── history.js          # Persistent history (load/save/delete)
├── request/
│   ├── builder.js          # Builds fetch options from user input
│   └── client.js           # Sends requests with spinner and error handling
├── ui/
│   ├── welcome.js          # Welcome banner
│   ├── menu.js             # Main menu
│   ├── prompts.js          # Interactive prompts for building requests
│   └── display.js          # Response and history display
└── utils/
    └── url.js              # URL builder with slash normalization
```

## Features

- **Interactive loop** — stays open until you choose Exit
- **Full request builder** — method, URL, query params, headers, JSON body
- **JSON validation** — retries on invalid input instead of crashing
- **Persistent history** — saved to `~/.reqbox/history.json`
- **Re-run saved requests** — resend or edit before sending
- **Delete history** — remove individual entries with confirmation
- **Error handling** — network errors, invalid JSON, corrupted history files
- **Clean terminal UI** — colored output, boxed responses, spinners

## Tech Stack

- Node.js 24+ (native fetch, fs/promises)
- ES Modules
- [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts)
- [chalk](https://www.npmjs.com/package/chalk)
- [boxen](https://www.npmjs.com/package/boxen)
- [ora](https://www.npmjs.com/package/ora)

## License

MIT
