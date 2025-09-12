# CLAUDE.md - Great Divide Elevation Map

## Project Overview
An interactive web application for drawing elevation profiles along the Great Divide Mountain Bike Route and Tour Divide route. Built as a static web application using JavaScript, D3.js, and webpack.

## Key Technologies
- **Frontend:** Vanilla JavaScript, D3.js v3.5.17, Bootstrap 3.4.1, Handlebars 4.7.7, jQuery 3.5.1
- **Build Tools:** Webpack 5, LESS, CSS/Style loaders
- **Maps:** Google Maps API integration
- **Development:** Docker with multi-service setup, Nginx + PHP-FPM
- **Deployment:** Capistrano (via Docker)

## Development Commands

### Docker Development (Recommended)
```bash
# Start all services
docker-compose up -d

# Access application at http://localhost:80 (served by nginx)
# Development tools available via node container

# Install dependencies
docker-compose exec node npm install

# Start webpack development server with watch mode
docker-compose exec node npm run dev

# Build assets for production
docker-compose exec node npm run build

# Capistrano deployment
docker-compose build capistrano
docker-compose exec capistrano [deployment-commands]
```

### Local Development
```bash
# Install dependencies
npm install

# Development with watch mode
npm run dev

# Production build
npm run build

# Serve locally with PHP
npm run serve  # Runs on localhost:8000
```

## Project Structure
```
├── docker/                 # Docker configuration
│   ├── app/                # Nginx + PHP-FPM configuration
│   ├── node/               # Node.js environment for development
│   └── capistrano/         # Deployment environment
├── public/                 # Built assets and index.html entry point
│   └── assets/build/       # Webpack output directory
├── resources/              # Source files
│   ├── js/                 # JavaScript source (app.js, libs.js)
│   ├── less/               # LESS stylesheets
│   └── assets/             # Static assets copied by webpack
├── config/                 # Configuration files
├── log/                    # Log files
├── docker-compose.yml      # Multi-service Docker setup
├── .env                    # Environment configuration
├── webpack.config.js       # Webpack build configuration
├── Capfile                 # Capistrano deployment configuration
└── Gemfile                 # Ruby dependencies for Capistrano
```

## Build System
- **Webpack 5** with multiple entry points:
  - `app.js` → Main application JavaScript
  - `libs.js` → Third-party libraries
  - `app.less` → Main stylesheet
- **Output:** Built files go to `public/assets/build/`
- **Asset copying:** Static assets from `resources/assets/` to `public/assets/`

## Environment Configuration
- Environment variables in `.env` file
- `WWWUID=1000` for Docker user permissions
- `APP_PORT=80` for application port

## Docker Services
1. **app** - Nginx + PHP-FPM server on port 80
2. **node** - Node.js environment for building assets (port 8976)
3. **capistrano** - Deployment environment with SSH access

## Testing & Quality
No automated test framework detected. Consider adding:
- Unit tests for JavaScript modules
- End-to-end tests for map interactions
- CSS/LESS linting

## Common Tasks
- **Add new JavaScript features:** Edit files in `resources/js/`
- **Style changes:** Edit LESS files in `resources/less/`
- **Build for production:** Run `npm run build` or `docker-compose exec node npm run build`
- **Deploy:** Build deployment environment with `docker-compose build capistrano` then run deployment commands

## Architecture Notes
- Static site with client-side JavaScript
- Google Maps API integration for mapping
- D3.js for elevation profile visualization
- Bootstrap 3 for responsive UI components
- Handlebars for client-side templating

## Development Tips
- Use Docker for consistent development environment
- Watch mode (`npm run dev`) for automatic rebuilding during development
- Check `public/index.html` for the main application entry point
- Built assets are gitignored and generated via webpack