# Trip Planner

A full-stack web application for planning trips with AI-powered attraction recommendations. Built with Angular frontend and ASP.NET Core backend.

## 🚀 Features

- **Interactive Trip Planning**: Step-by-step wizard for planning your trips
- **Country & City Selection**: Browse and select destinations with image carousels
- **AI-Powered Recommendations**: Get attraction suggestions using Cohere AI
- **Time Planning**: Interactive clock components for departure/arrival times
- **Responsive Design**: Modern UI with Angular Material and Bootstrap

## 🏗️ Project Structure

```
trip-planner/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   ├── assets/
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
├── server/                 # ASP.NET Core backend
│   ├── TripPlanner.API/
│   │   ├── Controllers/
│   │   ├── Services/
│   │   ├── Models/
│   │   └── Data/
│   └── TripPlanner.API.sln
└── README.md
```

## 🛠️ Technologies Used

### Frontend (Angular)

- **Angular 17+** with standalone components
- **Angular Material** for UI components
- **ng-bootstrap** for carousel components
- **Bootstrap 5** for styling
- **TypeScript** for type safety

### Backend (ASP.NET Core)

- **ASP.NET Core 8.0** Web API
- **Entity Framework Core** with SQLite
- **Cohere AI API** for attraction recommendations
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **.NET 8.0 SDK**
- **Git**

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trip-planner.git
cd trip-planner
```

### 2. Backend Setup (ASP.NET Core)

Navigate to the server directory:

```bash
cd server/TripPlanner.API
```

#### Install Dependencies

```bash
dotnet restore
```

#### Configure Database

```bash
dotnet ef database update
```

#### Set API Keys

Create `appsettings.Development.json` (or add to existing):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=tripplanner.db"
  },
  "Cohere": {
    "ApiKey": "your-cohere-api-key-here"
  }
}
```

#### Run the Backend

```bash
dotnet run --launch-profile "TripPlanner.API"
```

The API will be available at:

- **HTTPS**: `https://localhost:7227`
- **HTTP**: `http://localhost:5238`

### 3. Frontend Setup (Angular)

Navigate to the client directory:

```bash
cd client
```

#### Install Dependencies

```bash
npm install
```

#### Install Required Packages

```bash
npm install @angular/material @angular/cdk
npm install @ng-bootstrap/ng-bootstrap bootstrap
npm install @angular/localize
npm install zone.js
npm install ngx-daterangepicker-material
```

#### Run the Frontend

```bash
ng serve
```

The application will be available at: `http://localhost:4200`

## 🔧 Development

### Backend Development

#### Database Migrations

```bash
# Add new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update
```

#### Debug in VS Code

1. Open the `server` folder in VS Code
2. Set breakpoints in your code
3. Press `F5` or use the Debug panel
4. Select "TripPlanner.API" profile

### Frontend Development

#### Generate Components

```bash
ng generate component component-name
```

#### Build for Production

```bash
ng build --configuration production
```

#### Run Tests

```bash
ng test
```

## 🌐 API Endpoints

### Countries

- `GET /api/country` - Get all countries
- `GET /api/country/{id}` - Get country by ID
- `GET /api/country/name/{name}` - Get country by name

### Cities

- `GET /api/city` - Get all cities
- `GET /api/city/{id}` - Get city by ID
- `GET /api/city/country/{countryId}` - Get cities by country

### Attractions

- `GET /api/attraction` - Get all attractions
- `GET /api/attraction/{id}` - Get attraction by ID
- `GET /api/attraction/city/{cityId}` - Get attractions by city

### AI Attractions

- `POST /api/aiattraction/generate` - Generate attractions for a city

Example request body:

```json
{
  "cityName": "Paris",
  "countryName": "France"
}
```

### Trips

- `GET /api/trip` - Get all trips
- `POST /api/trip` - Create new trip
- `PUT /api/trip/{id}` - Update trip
- `DELETE /api/trip/{id}` - Delete trip

## 🔑 Environment Variables

### Backend

- `ASPNETCORE_ENVIRONMENT` - Set to "Development" or "Production"
- `ASPNETCORE_URLS` - Override default URLs
- `Cohere:ApiKey` - Your Cohere AI API key

### Frontend

- No environment variables required for basic setup

## 🚀 Deployment

### Backend (ASP.NET Core)

```bash
dotnet publish -c Release -o ./publish
```

### Frontend (Angular)

```bash
ng build --configuration production
```

Deploy the `dist/` folder to your web server.

## 📱 Application Features

### Planning Wizard

- Multi-step form for trip planning
- Country and city selection with image previews
- Date range picker for trip duration
- Interactive clock components for time selection

### AI Integration

- Powered by Cohere AI for intelligent attraction recommendations
- Context-aware suggestions based on selected destination
- Seamless integration with trip planning workflow

### User Interface

- Modern, responsive design
- Angular Material components
- Bootstrap 5 styling
- Interactive carousels for destination browsing
- Custom draggable clock components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**

- Ensure the backend is running on the correct ports
- Check that CORS is configured for `http://localhost:4200`

**Bootstrap Styles Not Loading**

- Verify Bootstrap CSS is in `angular.json` styles array
- Restart `ng serve` after adding styles

**Database Connection Issues**

- Ensure SQLite database file exists
- Run `dotnet ef database update`

**AI Service Errors**

- Verify Cohere API key is set correctly
- Use supported model names (e.g., "command" instead of "command-r")
- Check network connectivity to Cohere API

**Zone.js Errors**

- Ensure `zone.js` is installed: `npm install zone.js`
- Import in `main.ts`: `import 'zone.js';`

**Localization Errors**

- Install localization package: `npm install @angular/localize`
- Import in `main.ts`: `import '@angular/localize/init';`

### Development Tips

1. **Backend First**: Always start the backend before the frontend
2. **Database Seeding**: The application includes seed data for countries and cities
3. **API Testing**: Use the provided `.http` files for testing endpoints
4. **Debugging**: Use browser developer tools for frontend issues
5. **Logs**: Check console output for both client and server applications

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

## 🔧 Technical Notes

### Database Schema

- **Countries**: Basic country information with images
- **Cities**: Cities linked to countries with image collections
- **Attractions**: Points of interest linked to cities
- **Trips**: User-created trip plans
- **Users**: User authentication and profiles

### Security Considerations

- API keys should be stored securely
- CORS is configured for development (localhost:4200)
- SQL injection protection via Entity Framework
- Input validation on all API endpoints

### Performance

- Entity Framework with lazy loading
- Angular OnPush change detection where applicable
- Image optimization for carousel components
- Efficient API endpoint design
