
# Country Info Application

This is an Angular application that allows users to search for countries, view detailed information about their holidays, and see neighboring countries. It uses the [Nager.Date API](https://date.nager.at/) to fetch country and holiday data.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Architecture](#architecture)
- [Libraries and Tools](#libraries-and-tools)
- [Environment Configuration](#environment-configuration)

## Features

- **Search Countries**: Search for countries by name and view country details.
- **View Holidays**: Display the list of holidays for a selected country, including the name, date, and type of the holiday.
- **Neighboring Countries**: View neighboring countries for the selected country.
- **Random Countries Widget**: Displays a widget that shows three random countries and their upcoming holidays.
- **Year Switching**: Users can switch between different years (2020-2030) to view holidays for the selected country.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/angular-country-info-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd angular-country-info-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the application locally:

1. Start the Angular development server:
   ```bash
   ng serve
   ```

2. Open your browser and navigate to `http://localhost:4200/`.

The application will automatically reload if you make any changes to the code.

## Building the Application

To build the application for production:

1. Run the build command:
   ```bash
   ng build --prod
   ```

The build artifacts will be stored in the `dist/` directory. You can deploy these files to a web server.

## Architecture

The application is divided into the following components:

- **HomeComponent**: The landing page where users can search for countries, view random countries and their holidays, and navigate to a country's detail page.
- **CountryComponent**: Displays detailed information about the selected country, including a list of holidays and the neighboring countries.

### Service Layer:
- **CountryService**: Handles fetching data from the [Nager.Date API](https://date.nager.at/), including country details and holiday information.

### Environment Configuration:
The project uses Angular's environment configuration files for managing different environments (development, production). API URLs and other sensitive information can be stored in these files.

## Libraries and Tools

- **Angular**: A popular web framework for building single-page applications (SPA).
- **Nager.Date API**: An external REST API for retrieving country and holiday data.
- **ESLint**: Used for linting TypeScript code to maintain code quality.
- **Prettier**: Used for code formatting to ensure consistency.
- **RxJS**: Angular's default reactive programming library, used for handling HTTP requests and other asynchronous operations.

## Environment Configuration

The application uses Angular's environment files to store environment-specific settings such as API URLs. You can find these files in the `src/environments/` directory.

- **`environment.ts`** (for development)
- **`environment.prod.ts`** (for production)

To configure the API URL and any other environment variables, update the respective environment file:
```typescript
export const environment = {
  production: false,
    availableCountriesUrl: 'https://date.nager.at/api/v3/AvailableCountries/',
    holidayApiUrl: 'https://date.nager.at/api/v3/PublicHolidays'
};
```

## Additional Notes

- **ESLint and Prettier**: This project uses ESLint for linting and Prettier for formatting. You can run the following commands to lint or format the code:
    - To lint the code:
      ```bash
      npm run lint
      ```
    - To format the code:
      ```bash
      npm run format
      ```

---

This `README.md` provides all the necessary details for developers to set up, run, and build the Angular application while maintaining consistency and code quality. Adjust the API URLs and paths based on your actual project setup.
