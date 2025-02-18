# Book Management API

A RESTful API for managing book inventory built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for books
- Input validation using Joi
- Rate limiting
- Error handling
- Soft delete functionality
- Search functionality with text indexing
- Docker support for easy deployment
- TypeScript for type safety

## Prerequisites

- Node.js (v22.10.0 or later)
- MongoDB (v7.0.7 or later)
- Docker and Docker Compose (optional)

## Installation and Setup

### Option 1: Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd book-management-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```
DATABASE_URI=mongodb://localhost:27017/bookstore
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=1000
```

4. Start the development server:

```bash
npm run dev
```

### Option 2: Using Docker

1. Clone the repository and navigate to the project directory
2. Build and start the containers:

```bash
docker-compose up -d
```

This will start both the API service and MongoDB database. The API will be available at `http://localhost:3005`.

## API Endpoints

### Books

- `POST /api/v1/books` - Create a new book
- `GET /api/v1/books` - List all books (with pagination)
- `GET /api/v1/books/:book_id` - Get a specific book
- `PATCH /api/v1/books/:book_id` - Update a book
- `DELETE /api/v1/books/:book_id` - Soft delete a book

## Development

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code using Biome
- `npm run pm2:start` - Start production server using PM2
- `npm run pm2:stop` - Stop PM2 processes
- `npm run pm2:delete` - Delete PM2 processes

### Project Structure

```
src/
  ├── features/          # Feature modules
  │   └── book/         # Book feature
  ├── shared/           # Shared modules
  │   ├── globals/      # Global utilities
  │   ├── middlewares/  # Express middlewares
  │   ├── repositories/ # Data access layer
  │   └── transformers/ # Data transformers
  ├── app.ts           # Application entry point
  ├── config.ts        # Configuration
  ├── routes.ts        # Route definitions
  └── setupServer.ts   # Server setup
```

## Docker Commands

### Build and Start Services

```bash
# Build and start all services
docker-compose up -d

# Build and start specific service
docker-compose up -d app

# Rebuild services
docker-compose up -d --build
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View Logs

```bash
# View logs of all services
docker-compose logs

# View logs of specific service
docker-compose logs app

# Follow logs
docker-compose logs -f
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
