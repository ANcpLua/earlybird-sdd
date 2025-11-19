# Early Bird Management System (EBMS)

[https://ancplua.github.io/earlybird-sdd](https://ancplua.github.io/earlybird-sdd)

A responsive breakfast ordering application built with vanilla JavaScript and React principles, demonstrating hexagonal architecture and domain-driven design.

## Documentation

Detailed architectural decisions and models are maintained in the `EarlyBird/` directory:

- [Application Core & Architecture](EarlyBird/EarlyBird_Application_Core.md) - System boundaries and "Blood Type" classification.
- [Domain Model](EarlyBird/EarlyBird_Domain_Model.md) - JSDoc definitions and aggregate root relationships.
- [Hexagonal Architecture Map](EarlyBird/EarlyBird_Hexagonal_Architecture.md) - Visual mapping of UI Adapters to Core Services.
- [Order Workflow](EarlyBird/EarlyBird_Order_Workflow.md) - State machine and sequence diagrams.
- [Search Interface Contract](EarlyBird/ISearchProduct_Interface.md) - Module contracts for product retrieval.

## Features

- **Secure Login**: 8-digit customer number with Luhn checksum validation.
- **Product Catalog**: Prepackaged and simple breakfast items with calorie filtering.
- **Order Builder**: Real-time totals, blueprint saving, and restoration.
- **Architecture**: Strict separation of React UI (Adapters) and Business Logic (Core).

## Setup & Development

```bash
npm install
npm run dev
# Open http://localhost:5173
```

To build for production:

```bash
npm run build
```

## Test Credentials

Use these credentials to validate the login logic and checksum algorithms.

| Customer | Number | Checksum Logic |
|----------|--------|----------------|
| Anna Meier | `38429730` | Valid |
| Max Mustermann | `12345678` | Valid |
| Invalid Test | `38429734` | Fails Checksum |

## Architecture

The project implements a strict Hexagonal Architecture (Ports & Adapters) adapted for frontend development.

- **Core (Type A)**: Pure JavaScript modules independent of the framework (`src/services/`, `src/data/`).
- **Adapters (Type T)**: React components driving the core (`src/components/`).
- **Utils (Type O)**: Universal algorithms (`src/utils/`).

### Project Structure

```
/
├── EarlyBird/             # Architectural Documentation
├── src/
│   ├── main.js            # App Entry
│   ├── components/        # UI Adapters (React)
│   ├── services/          # Application Services (Core)
│   ├── data/              # Domain Data (Core)
│   └── utils/             # Shared Algorithms
├── index.html
└── package.json
```