# Snapcheck

Snapcheck is a background verification app built using Next.js, Shad CN UI, Tailwind CSS, MongoDB, and TypeScript (.tsx). This application streamlines the process of verifying backgrounds with a sleek and responsive user interface.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive and intuitive UI built with Shad CN UI and Tailwind CSS
- Background verification functionalities
- Integration with MongoDB for data storage
- Developed with Next.js and TypeScript for a robust and scalable application

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm) 
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

Follow these steps to set up and run Snapcheck on your local machine:

1. Clone the repository:

    ```bash
    git clone https://github.com/agilelabsgit/snapcheck.git
    ```

2. Navigate to the project directory:

    ```bash
    cd snapcheck
    ```

3. Install the dependencies:

    Using npm:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root of the project and add your MongoDB connection string and any other necessary environment variables:

    ```env
     MONGODB_URI=""
    TOKEN_SECRET=""
    EMAIL_USERNAME=""
    EMAIL_PASSWORD=""
    DOMAIN=http://localhost:3000
    ```

5. Run the development server:

    Using npm:
    ```bash
    npm run dev
    ```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application running.

## Usage

Once the application is running, you can navigate through the various sections to perform background verification tasks. The UI is designed to be intuitive and user-friendly.

## Contributing

Contributions are welcome! If you would like to contribute to Snapcheck, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---