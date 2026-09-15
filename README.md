# 📦 Reqbox

> A simple interactive CLI HTTP client for making and inspecting API requests.

Reqbox lets you make HTTP requests directly from your terminal without leaving the command line.

Select a method, enter a URL, optionally provide a request body, and inspect the response — all through an interactive CLI.

## 🚧 Status

Reqbox is currently under active development.

## ✨ Features

* Interactive HTTP method selection
* Custom URL input
* Local development URL support
* Optional request body
* HTTP response status and body
* Terminal-friendly interface

## 🛠️ Built With

* [Node.js](https://nodejs.org/)
* [Inquirer](https://www.npmjs.com/package/@inquirer/prompts)
* [Chalk](https://www.npmjs.com/package/chalk)
* [Boxen](https://www.npmjs.com/package/boxen)
* [Ora](https://www.npmjs.com/package/ora)
* [Commander](https://www.npmjs.com/package/commander)

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/reqbox.git
cd reqbox
```

Install dependencies:

```bash
npm install
```

Run Reqbox:

```bash
npm start
```

You can also install it locally as a CLI:

```bash
npm install -g .
```

Then run:

```bash
reqbox
```

## 🚀 Usage

Start Reqbox:

```bash
reqbox
```

You'll be prompted to select an HTTP method:

```text
? Select HTTP method
❯ GET
  POST
  PUT
  PATCH
  DELETE
```

Then enter the URL.

For local development, Reqbox uses:

```text
http://localhost:3000
```

as the default base URL.

You can then choose whether to send a request body before Reqbox sends the request and displays the response.

## 🗺️ Roadmap

* [x] Interactive HTTP method selection
* [x] URL input
* [x] Localhost default
* [ ] Request body support
* [ ] Request headers
* [ ] Response formatting
* [ ] Loading indicators
* [ ] Request history
* [ ] Saved requests
* [ ] Environment variables
* [ ] Interactive request editor

## 📁 Project Structure

```text
reqbox/
├── src/
│   ├── app.js
│   └── ui/
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your changes.
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License.
