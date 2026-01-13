# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). This weather application provides real-time weather data and forecasts using a modern, responsive interface.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Installation and Usage](#installation-and-usage)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Architecture](#architecture)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- **Search for weather information**: Enter a location in the search bar with real-time autocompletion.
- **View current weather**: Detailed conditions including temperature, "feels like", humidity, wind speed, and precipitation.
- **7-Day Forecast**: Browse a daily high/low temperature forecast with weather icons.
- **Hourly Forecast**: See temperature changes throughout the day in a interactive sidebar.
- **Unit Conversion**: Toggle between Celsius/Fahrenheit and change wind speed/precipitation units via a centralized units dropdown.
- **Responsive Layout**: Optimized interface for mobile, tablet, and desktop screens.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/bhzeuscagd/weather-app-main)
- Live Site URL: [Vercel Deployment](https://weather-app-main.vercel.app) *(Update if necessary)*

## Installation and Usage

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) or npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bhzeuscagd/weather-app-main.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app-main
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Usage
Start the development server:
```bash
pnpm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser to see the result.

## My process

### Built with

- [Astro](https://astro.build/) - Web framework for content-driven websites.
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
- [Open-Meteo API](https://open-meteo.com/) - Free weather API for geocoding and forecasts.
- Semantic HTML5 markup
- CSS Grid & Flexbox
- Mobile-first workflow

### Architecture

#### Component Map
The application is structured into modular Astro components for high reusability and performance:

- **`Layout`**: The base HTML container and global styles provider.
- **`Header`**: Top navigation containing the logo and the `Units` selector.
- **`SearchBar`**: Hybrid component using client-side scripts for location autocomplete.
- **`StatCard`**: The primary display for current weather metrics (temp, humidity, wind).
- **`DailyForecast`**: Grid-based display for the 7-day weather outlook.
- **`HourlyForecast`**: Sidebar component visualizing hourly temperature fluctuations.
- **`Skeleton` Components**: Graceful loading states for `StatCard`, `DailyForecast`, and `HourlyForecast`.

#### Data Flow Architecture
The app follows a Server-Side Rendering (SSR) approach to ensure fast initial loads and SEO optimization:

1. **User Interaction**: User searches a city or changes prefered units.
2. **State Management**: The UI updates the URL search parameters (e.g., `?city=London&units=metric`).
3. **SSR Fetching**: The `index.astro` entry point detects URL changes and triggers a server-side request.
4. **Service Layer (`weather.ts`)**:
   - `getCoordinates`: Converts city names to latitude/longitude.
   - `getWeather`: Fetches current, daily, and hourly data from Open-Meteo.
5. **Data Hydration**: The fetched data is passed into Astro components as props, which then render the finalized HTML.
6. **Error/Loading**: If data is unavailable, the system renders `ErrorState` or `Skeleton` components based on the current application state.

## Author
- Portfolio - [Cagd](https://portfolio-cagd.vercel.app/)
- Frontend Mentor - [@bhzeuscagd](https://www.frontendmentor.io/profile/bhzeuscagd)
- GitHub - [bhzeuscagd](https://github.com/bhzeuscagd)

## Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for their excellent and free weather API.
- Frontend Mentor for the challenging and well-structured project brief.
