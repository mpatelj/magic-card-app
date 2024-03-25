# Design Decisions and Thoughts

## Design Explanation for React Components

### App Component (App.tsx)
- State Management: Utilizes React's useState hook to manage state for search results, searched term, whether the user has searched, current page, total items, and items per page.
- API Interaction: Handles API requests to fetch cards based on the search query using Axios.
- Debouncing: Implements a debounce function to limit the frequency of API requests triggered by user input in the search bar.
- Pagination: Facilitates pagination functionality for displaying search results.
- Conditional Rendering: Displays either the search results (if the user has searched) or the landing page.
- Component Composition: Renders the SearchBar, CardList, and LandingPage components based on the application state.

### SearchBar Component (SearchBar.tsx)
- State Management: Uses React's useState hook to manage the search term input.
- Effect Hook: Utilizes the useEffect hook to update the search term input when the searchTerm prop changes.
- Form Handling: Implements form submission handling to trigger the search action.
- Input Field: Renders an input field with placeholder text for the search query.
- Styling: Applies CSS classes for styling the search bar and its components.

### LandingPage Component (LandingPage.tsx)
- Content: Displays a welcome message and the SearchBar component.
- Styling: Utilizes CSS classes for layout and styling.

### CardList Component (CardList.tsx)
- State Management: Manages state for sorting field and order using React's useState hook.
- Pagination: Implements pagination functionality to navigate through search results.
- Sorting: Allows sorting of search results based on different fields such as name, collector number, set name, and rarity.
- Conditional Rendering: Displays a message when no search results are found.
- Dynamic Content: Renders a grid of card items dynamically based on the search results.
- Styling: Applies CSS classes for styling the card list and its components.

## Design Explanation for Node Express Server

### Express Server (index.ts)
- Server Setup: Creates an Express server listening on port 3001.
- Middleware: Uses the cors middleware to enable Cross-Origin Resource Sharing.
- GET Endpoint: Defines a GET endpoint at /cards/search to handle card search requests.
- Request Handling: Validates the presence of a search query parameter and sends a request to the external API (Scryfall) to fetch card data.
- Error Handling: Handles errors gracefully, logging them to the console and returning appropriate error responses.
- Environment Variables: Utilizes environment variables for sensitive data such as the Scryfall API URL.

# Overall Design Decisions
- Separation of Concerns: Components are designed to handle specific responsibilities, such as rendering UI, managing state, and interacting with APIs.
- Reusable Components: Components such as SearchBar and CardList are designed to be reusable across different parts of the application.
- State Management: Utilizes React hooks for managing component state, providing a more predictable and efficient way to update UI.
- Error Handling: Implements error handling at both the frontend and backend to provide a better user experience and troubleshoot issues.
- Responsive Design: Utilizes responsive design techniques to ensure the application is accessible across different devices and screen sizes.
- Modularization: Breaks down the application into smaller, manageable components and modules to improve code organization and maintainability.
