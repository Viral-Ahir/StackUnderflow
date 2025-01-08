## **README-instructions.md**

## **Table of Contents**

- [Testing the Deployed Application on Render](#testing-the-deployed-application-on-render)
- [Installing dependencies](#installing-dependencies)
- [Running Jest Test Cases](#running-jest-test-cases)
- [Generating Coverage Report for Jest Tests](#generating-coverage-report-for-jest-tests)
- [Running Cypress Test Cases](#running-cypress-test-cases)
- [Generating the CodeQL Report](#generating-the-codeql-report)
- [Setting Environment Variables](#setting-environment-variables)

---

## **1. Testing the Deployed Application on Render**

1. Open your web browser.
2. Navigate to the deployed application URL on Render - https://final-project-viral-sougata.onrender.com/
3. Test the application by navigating through its features and verifying its behavior.
4. The list of features that our application supports is in the `README-feature.md` file.

## **2. Installing Dependencies**

1. Use the following commands to install all dependencies from the project’s root
2. `cd client/`
   `npm install`
   `cd server/`
   `npm install`
   `cd testing`
   `npm install`

## **3. Running Jest Test Cases**

1. Navigate to the **server** directory by typing this command in root directory:
   cd server
2. Then run `npx jest --runInBand tests/`, this command will run all the jest tests in the server directory.
3. To run a specific jest test file, use this command - `npx jest --runInBand tests/<test-file-name>`

## **4. Generating Coverage Report for Jest tests**

1. Navigate to the **server** directory by typing this command in root directory:
   cd server
2. Then run `npx jest --runInBand --coverage tests/`, this command will run all the jest tests in the server directory, and generate the coverage report.
3. We have achieved 100% line coverage for all files by adding 193 jest tests in total. It was not possible to achieve 100% branch coverage for some files because of the multiple scenarios that were possible as a result of conditional branching, catch block safeguards, and changes made to fix sql injection.
4. We have also added a screenshot of the coverage in the `client\res` directory.
5. The coverage report will be available in the server/coverage/ directory.
6. The jest tests run as part of `GITHUB actions`, refer to `main.yml` script on how GITHUB actions is configured.

## **5. Running Cypress Test case**

1. Navigate to the **server** directory by typing this command in root directory:
   cd server
2. Then start the server by `npm start`
3. Navigate to the **client** directory by typing this command in root directory:
   cd client
4. Then start the client by `npm start`
5. To run the BDD cypress test cases, run the following command from the client directory - `npx cypress open`, and to run in headless mode, run this command - `npx cypress run --spec </path/to/e2e/tests>`
6. The BDD tests run as part of `GITHUB actions`, refer to `main.yml` script on how GITHUB actions is configured.
7. To run the e2e cypress test cases, run the following command from the testing directory - `npx cypress open`, and to run in headless mode, run this command - `npx cypress run --spec </path/to/e2e/tests>`

## **6. Generating the CodeQL Report**

1. Download and extract the code Ql bundle with the extraction root named <cs5500>
   Place the cs5500 folder into our root project directory, and then execute the Commands as follows:
   `cd cs5500`
   `mkdir semmle`
   `cd ..`
   ` ./cs5500/codeql/codeql.exe database create ./cs5500/semmle/fakeso-db --language=javascript-typescript`
   `cd cs5500/semmle`
   `mkdir report`
   `cd ..`
   `cd ..`
   `./cs5500/codeql/codeql.exe database analyze ./cs5500/semmle/fakeso-db --format="sarif-latest" --output ./cs5500/semmle/report/codeql-latest-report.sarif`
2. We have also added the report and results of code-ql in the `client\res` directory.

## **7. Setting Environment Variables**

1. To run scripts or tests, the following environment variables should be set in a .env file or through the terminal.
2. Variable - Description
   REACT_APP_API_URL - Base URL for the API used by the client.
   PORT - Port on which the server runs.
   DATABASE_URL - URL for the database connection.
   JWT_SECRET - Secret key for JWT authentication.
3. Note: Ensure you restart the server after setting or modifying environment variables.
