# Text Widget System – Trumpet Take-Home

This is a minimal text widget system built with Next.js that demonstrates dynamic widget creation, backend persistence, and clean architecture.

---

## 🚀 Install & Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Usage

You can also run the app in a Docker container.  
**Make sure Docker Desktop is running** before running the commands below.

### Build the Docker image

```bash
docker build -t trumpet-widget-app .
```

### Run the container

```bash
docker run -p 3000:3000 trumpet-widget-app
```

Then open your browser at: [http://localhost:3000](http://localhost:3000)

This will run the production build of the app using `next start`, including both frontend and backend API routes.

---

## 🧪 Run Tests

The app is covered by a complete Jest test suite.

Run:

```bash
npm test
```

What’s covered:
- Widget repository (in-memory storage)
- Widget service (business logic layer)
- Full API routes (`/api/widgets`) including GET, POST, and DELETE methods

Test coverage across statements, branches, functions, and lines.

---

## 🛠 Development Approach

This project was built using a **production-grade architecture** inspired by backend layering principles:

### Layers

- **Repository Layer**  
  Located in `lib/widgets/widgetRepository.ts`, this handles all low-level storage. It’s currently an in-memory store, but could be swapped with a DB or file-based store.

- **Service Layer**  
  Located in `lib/widgets/widgetService.ts`, this manages business logic and orchestration between the API and data layers. It includes structured logging for traceability.

- **API Layer**  
  Implemented via Next.js API routes (`pages/api/widgets.ts`), this layer handles HTTP request validation, routing, and delegates to the service layer. Logs are recorded for incoming requests and major actions (store/delete).

### Testing Philosophy

Tests are colocated in `__tests__` folders adjacent to their logic. Each layer is independently tested:
- Services and repositories with unit tests
- API routes with `node-mocks-http` and integration-like behavior

All tests run in Node and are fully isolated, with 100% coverage.

---


## 🧱 Outcome

- Cleanly layered backend design
- Fully tested stack
- Clear separation of logic
- Portable and extensible codebase

---

## 📝 TODO / Future Improvements

- Add unit and integration tests for frontend components (Widget, Sidebar, Canvas)
- Add end-to-end (E2E) tests using Playwright or Cypress
- Refactor state logic into a context or state manager if scale grows
- Polish UI with optional styling framework (e.g., Tailwind or CSS Modules)
- Implement persistent storage with file system or database instead of in-memory
- Handle API errors and network states gracefully in the UI
- Add accessibility enhancements and keyboard navigation support
