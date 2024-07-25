# Magic Card Search Application

## Project Overview

This project is a full-stack application built with TypeScript, React, Node, and Express. The application allows users to search for Magic: The Gathering cards using the Scryfall API. Users can input a card name in the search bar, and the application will display relevant card details including images, names, set names, numbers, and rarities.

## Technologies

- **Backend**: 
  - Node and Express server with a single REST endpoint to fetch card data from the Scryfall API.
  - Uses environment variables to manage sensitive data like the API URL.

- **Frontend**:
  - React application with a search bar to input card names.
  - Displays search results dynamically without needing to click a button.
  - Prevents multiple API requests per second using debouncing.
  - Pagination and sorting features for better user experience.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install server dependencies:

    ```bash
    npm install
    ```

3. Install client dependencies:

    ```bash
    cd ./client
    npm install
    ```

### Running the Project

1. Start both the Node and React servers from the project root:

    ```bash
    npm start
    ```

2. The application should now be running with:
   - A Node server on port **3001**
   - A React development server on port **3000**

### Environment Variables

Ensure you have a `.env` file in the root of the project with the following variable:

```plaintext
SCRYFALL_API_URL=<your-scryfall-api-url>
