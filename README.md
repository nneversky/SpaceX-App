SpaceX Launches 2020 - React TypeScript App
Project Description
This application displays a list of SpaceX launches from 2020 with the ability to view additional details about each launch.

<img width="1920" height="868" alt="image" src="https://github.com/user-attachments/assets/9e68e906-60ec-4818-9847-0457a294201d" />

Key Features
Technology Stack:

Vite for project bundling

React with TypeScript

Mantine UI component library

React StrictMode for strict controls

State Management:

Uses useReducer instead of useState for complex state

Typed reducers and actions

Modal Window:

Implemented using Portal (without Mantine's built-in solutions)

Open/close animations

Testing:

Test coverage for main application scenarios

Tests for components, reducer and API calls

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/14cd7a8d-9fad-4d8b-ba72-abad730931d6" />

API
The app uses SpaceX public API:

2020 launches list: https://api.spacexdata.com/v3/launches?launch_year=2020

Displays for each launch: mission name, rocket name and mission patch
