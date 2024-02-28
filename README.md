# Frontend Documentation

This frontend template leverages Vue 3 and Vuetify to provide a robust starting point for building responsive and visually appealing web applications. Integrated with Vue Router for navigation, Axios for HTTP requests, and a global state management strategy, it simplifies the development process by offering a pre-configured setup. This document aims to guide developers through understanding and utilizing this template effectively.

## Purpose
The template is designed to accelerate the development process by providing a structured and comprehensive frontend framework. It allows developers to focus on building unique features for their web applications, knowing that the foundational frontend elements are already in place.

## Requirements
Before utilizing this frontend template, ensure you have the following prerequisites:

-  Node.js installed on your system
- A basic understanding of Vue.js and component-based architecture
- Familiarity with Vuetify for UI components

## Setup
1. Clone the repository containing the frontend template to your local machine.
2. Navigate to the frontend project directory and run `npm install` to install the necessary dependencies.
3. Ensure the backend server is running as per the backend documentation to allow for API interactions.
4. Correctly configure `.env` and `.env.local` files as described in the `example.env` and `example.env.local` files.
5. Run `npm run serve` to start the development server for the frontend application.
6. The application should now be accessible at the default URL (`http://localhost:8080`), unless otherwise configured.

## Documentation Overview
### Vue 3
Vue 3 is the underlying JavaScript framework used in this template, offering an approachable, versatile, and performant foundation for web application development. Developers should familiarize themselves with the Composition API, reactive data binding, and component lifecycle hooks. More information can be found at Vue 3 Documentation.

### Vue Router
Vue Router facilitates the creation of single-page applications by enabling client-side page navigation without page reloads. This template comes with a pre-configured router setup in src/router/index.js, defining routes and associated components for your application's pages.

### Vuetify
Vuetify provides a comprehensive suite of UI components based on Material Design, making it easy to craft beautiful and responsive layouts. This template integrates Vuetify for its UI components, ensuring a consistent and modern design language across the application. Explore Vuetify's components at Vuetify Documentation.

## Frontend Structure
The template is structured to promote modularity and ease of maintenance:

- `src/components/`: Reusable Vue components.
- `src/views/`: Vue components representing pages.
- `src/router/index.js`: Vue Router configuration.
- `src/services/`: Axios services for backend communication.
- `src/store/index.js`: Global storage management.

### Services (Axios)

Axios services in src/services/ abstract the API calls to the backend, facilitating features like user authentication, data retrieval, and content management. Example services include UserService and AuthService, demonstrating how to interact with the backend API.

### Authentication
Authentication is handled through the AuthService, which includes methods for login, logout, registration, and fetching the current user. These methods utilize Axios to communicate with the backend authentication endpoints securely.

### Global Storages
Global state management is achieved with Vue's reactivity system, storing and managing global data such as user information and application settings in src/store/index.js. This approach allows for a centralized and reactive state accessible across components.

## Frontend Example
A simple frontend example is included to demonstrate the usage of components, routing, services, and state management. It showcases a login flow, a user profile page, and a main page layout with navigation, illustrating how different parts of the template work together.

## Production Guide
1. Run `npm run build` to build the project
2. Configure correctly your `.env` and `.env.local` files as described in the respective `example.env` and `example.env.local` files
3. Run the command `node templateFrontend.js` to run the webserver, this will be reacheable at `http://localhost:PORT` (defined in .env file)

## More Production Tips
For production deployment, consider the following best practices:

- Optimize your Vue application by following Vue's production deployment guide.
- Ensure Vuetify components are properly tree-shaken to reduce bundle sizes.
- Secure your application by implementing proper frontend security practices, such as HTTPS and content security policies.
- Use applications such as pm2 to ensure the service can run non stop.
- Use a reverse proxy like nginx.