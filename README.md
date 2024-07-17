Map of the World with Starbucks Stores
======================================

This project is a web application that displays a map of the world using the OpenLayers library, showcasing all Starbucks stores around the world. Users can also filter and view all the stores in a specific country.

Features
--------

- Interactive world map
- Display of all Starbucks stores globally
- Option to filter stores by country
- Developed with:
  - TypeScript
  - OpenLayers
  - Turf.js
  - GeoJSON
  - Vite

Getting Started
---------------

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher) or [yarn](https://yarnpkg.com/) (version 1.x or higher)

### Installation

1. Clone the repository:

   `git clone https://github.com/yourusername/starbucks-map.git cd starbucks-map`
2. Install the dependencies:

   Using npm:

   `npm install`

   Using yarn:

   `yarn install`

### Running the Project

To run the project locally, use Vite's development server.

Using npm:

`npm run dev`

Using yarn:

`yarn dev`

After running the above command, you should see an output similar to:

 `VITE vX.X.X  ready in X ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose`

Open your browser and navigate to `http://localhost:3000/` to see the application in action.

### Building for Production

To create a production build of the project, use the following command:

Using npm:

`npm run build`

Using yarn:

`yarn build`

The production-ready files will be output to the `dist` directory.

Project Structure
-----------------

- `src/` - Contains the source code for the application
  - `components/` - React components
  - `data/` - GeoJSON data for Starbucks stores
  - `utils/` - Utility functions and helpers
- `public/` - Static assets
- `index.html` - The main HTML file
- `vite.config.ts` - Vite configuration file
- `tsconfig.json` - TypeScript configuration file

Dependencies
------------

- [TypeScript](https://www.typescriptlang.org/)
- [OpenLayers](https://openlayers.org/)
- [Turf.js](https://turfjs.org/)
- [GeoJSON](https://geojson.org/)
- [Vite](https://vitejs.dev/)

Contributing
------------

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License
-------

This project is licensed under the MIT License.

Contact
-------

For any inquiries or support, please contact `yourname@example.com`.

---

Happy mapping! 🌍✨
