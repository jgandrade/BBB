## Packages

The project is divided into multiple packages within the `packages` directory:

- **business**: Contains the core business logic and domain models.
- **client-ui**: Contains the user interface components.
- *(Add more packages as needed)*

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jgandrade/bbb.git

2. Go to src directory and run:

   ```bash
   yarn install

3. To run business/server:

   ```bash
   yarn workspace business start:dev

4. To run client ui:

   ```bash
   yarn workspace client-ui dev
