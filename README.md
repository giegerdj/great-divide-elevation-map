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
   - Web application: http://localhost:8080
   - Development server (with live reload): http://localhost:3000

3. **Build assets for production:**
   ```bash
   docker-compose exec node npm run build
   ```

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

## Project Structure

```
├── docker/                 # Docker configuration
│   ├── web/                # Nginx configuration for static site serving
│   └── node/               # Node.js environment for development
├── public/                 # Static assets and built files
├── resources/              # Source files
│   ├── js/                 # JavaScript source
│   └── less/               # LESS stylesheets
├── docker-compose.yml      # Docker services configuration
├── webpack.config.js       # Webpack build configuration
└── package.json           # Node.js dependencies and scripts
```

## Technologies Used

- **Frontend:** Vanilla JavaScript, D3.js, Bootstrap 3, Handlebars
- **Build Tools:** Webpack, LESS
- **Maps:** Google Maps API
- **Development:** Docker, Nginx

## License

This project is open source. Please check the license file for details.