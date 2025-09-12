# Great Divide Elevation Map

An interactive web application for drawing elevation profiles along the Great Divide Mountain Bike Route and Tour Divide route.

## About

This project provides an interactive map where users can draw paths and visualize elevation profiles for the Great Divide Continental Divide Trail. It's built as a static web application using modern JavaScript and webpack for bundling.

## Features

- Interactive mapping with Google Maps integration
- Elevation profile visualization using D3.js
- Route drawing and editing capabilities
- Responsive design for mobile and desktop

## Development Setup

### Using Docker (Recommended)

1. **Build and start the development environment:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Web application: http://localhost:80 (served by nginx)
   - Development tools available via node container

3. **Development workflow:**
   ```bash
   # Install dependencies
   docker-compose exec node npm install
   
   # Start webpack development server with watch mode
   docker-compose exec node npm run dev
   
   # Build assets for production
   docker-compose exec node npm run build
   ```

4. **Available Docker services:**
   - `app`: Nginx + PHP-FPM server (port 80)
   - `node`: Node.js environment for building assets (port 8976)
   - `capistrano`: Deployment environment with SSH access

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Serve locally:**
   ```bash
   npm run serve
   ```

## Deployment

### Using Docker for Deployment

The project includes a Capistrano deployment setup via Docker:

```bash
# Build the deployment environment
docker-compose build capistrano

# Run deployment commands
docker-compose exec capistrano [deployment-commands]
```

### Environment Configuration

Copy `.env.example` to `.env` and configure:
- `WWWUID`: Set to your user ID (usually 1000)
- `APP_PORT`: Port for the web application (default: 80)

## Project Structure

```
├── docker/                 # Docker configuration
│   ├── app/                # Nginx + PHP-FPM configuration
│   ├── node/               # Node.js environment for development
│   └── capistrano/         # Deployment environment
├── public/                 # Static assets and built files
├── resources/              # Source files
│   ├── js/                 # JavaScript source
│   └── less/               # LESS stylesheets
├── docker-compose.yml      # Docker services configuration
├── .env                    # Environment configuration
├── webpack.config.js       # Webpack build configuration
└── package.json           # Node.js dependencies and scripts
```

## Technologies Used

- **Frontend:** Vanilla JavaScript, D3.js, Bootstrap 3, Handlebars
- **Build Tools:** Webpack, LESS
- **Maps:** Google Maps API
- **Development:** Docker, Nginx, PHP-FPM
- **Deployment:** Capistrano (via Docker)

## License

This project is open source. Please check the license file for details.