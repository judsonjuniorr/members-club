![Member Club Logo](assets/images/Logo.png)

# Member Club - Loyalty Card API

This project is a **Fullstack MBA Challenge**, simulating a customer loyalty card system with a responsive web interface and a JSON-based API backend.

## Features

- Manage customer details via API
- Search customer details by ID
- Responsive design for better user experience

## Getting Started

### Requirements

- [Bun](https://bun.sh/) (for API)
- [json-server](https://github.com/typicode/json-server)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/judsonjuniorr/members-club
   cd member-club
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the API:
   ```bash
   bun start
   ```

4. Open `index.html` in your browser to view the application interface.

### API Routes

- `GET /customers/:id` - Fetch customer by ID

### Data Structure

Data is stored in `db.json`, simulating a backend.