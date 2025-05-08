# Moderator Role Game

A web-based game with a modular architecture consisting of three main components:

- **Model**: Core game logic and data structures
- **View**: User interface and presentation layer
- **Controller**: Business logic and coordination between Model and View

## Project Structure

```
moderator-role/
├── packages/
│   ├── model/     # Core game logic and data structures
│   ├── view/      # User interface and presentation
│   └── controller/# Business logic and coordination
```

## Development

This project uses Yarn workspaces for managing the monorepo. To get started:

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Run development servers:
   ```bash
   yarn dev
   ```

3. Build all packages:
   ```bash
   yarn build
   ``` 