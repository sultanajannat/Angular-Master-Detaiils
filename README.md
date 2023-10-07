# Angular Client App - Candidate Management

Welcome to the Angular Client App for Candidate Management. This application is built using TypeScript and Material CSS and is designed to work in conjunction with another API project. Below, you'll find an overview of the project and instructions for getting started.

## Project Overview

The Angular Client App for Candidate Management is a frontend application that provides a user interface for managing candidate information and their associated skills. It communicates with the Core API project with JWT Authentication to facilitate these operations. The key features of this app include:

1. **Candidate Management**: Allows users to view, create, update, and delete candidate records. It provides a user-friendly interface for entering candidate information, including name, birthdate, phone number, and skills.

2. **Skill Management**: Offers the ability to manage skills, including adding new skills or editing existing ones.

3. **Integration with Core API**: Seamlessly integrates with the Core API project for data retrieval and manipulation. It leverages the API's JWT authentication for secure access.

4. **Material CSS**: Utilizes Material CSS for a clean and responsive user interface, providing a modern and intuitive design.

## Project Structure

The Angular Client App project is organized as follows:

- **src/app**: Contains the main components and services of the application.
  - **components**: Houses components responsible for candidate and skill management.
  - **services**: Includes services for making API calls and handling data.
- **src/assets**: Stores static assets, such as images and stylesheets.
- **src/environments**: Contains environment configuration files.
- **src/index.html**: The main HTML file for the application.
- **angular.json**: Angular CLI configuration.
- **package.json**: Lists project dependencies and scripts.

## Getting Started

To start using the Angular Client App for Candidate Management, follow these steps:

1. Clone the repository of the Angular Client App from [GitHub](https://t.ly/cLi7d).

2. Make sure you have Node.js and Angular CLI installed on your system. If not, you can install them by following the Angular [installation guide](https://angular.io/guide/setup-local).

3. Navigate to the project directory using your terminal.

4. Install project dependencies by running the following command:

   ```bash
   npm install
   ```

5. Configure the API endpoint in the `src/environments/environment.ts` file to match the URL of the Core API project.

6. Start the application by running:

   ```bash
   ng serve
   ```

7. Access the application in your web browser at `http://localhost:4200`.

8. Begin managing candidates and skills via the user-friendly interface.

## Conclusion

The Angular Client App for Candidate Management provides an efficient way to interact with the Core API project with JWT Authentication. It offers a responsive and visually appealing user interface for managing candidate information and skills. Feel free to customize and integrate it into your applications as needed.

For more details and usage instructions, please refer to the [GitHub repository](https://t.ly/cLi7d).

If you have any questions or need assistance, please don't hesitate to reach out to the project's maintainers. Happy coding!
