# Heimr

Heimr is a home dashboard that provides useful information about your household and local conditions.

![Screenshot of dashboard 01.12.23](doc/img/dash.png)

# Why Heimr

Heimr brings together all the information you need to start your day:

- **Live transit times** for your commute
- **Real-time electricity prices** to optimize your energy usage
- **Local weather** and conditions
- **News updates** from your favorite sources
- **City bike availability** in your area
- **Customizable widgets** to fit your household's needs

Currently only supporting data from Norway and some cards are Oslo specific.

# Getting started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- docker

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Heimr.git
   cd Heimr
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` and `client`. See .env.example in their respective repositories

4. **Run local docker compose**
   Run docker-compose in infra/local for starting your postgres server.

5. **Start the development servers**

   Open two terminal windows:

   **Terminal 1 - Start the backend:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the frontend:**

   ```bash
   cd client
   npm start
   ```

6. **Open web client and start building**
   Open browser in `http://localhost:3000`

# Backlog – Heimr

## Bugs

- widgets sometime renders with to wide width
- electricity service throwing error when getting to new month
- disable city bike map when moving it around
- negative minutes for bustimes

## MVP launch fix tilbakemeldinger

## Hard launch

- img identifier for image should be posted to server and img path in config (this is ok for mvp launch)
- accreditate all integrations
- review if you have rights to use all images in solution
- write about privacy etc.
- Go through security requirements for server
- update data should be displayed as small spinner in right corner

## Improvements

- calculate widget size and pos based on state when adding new widget
- Make dashboard smaller when opening edit mode
- collapse sidebar media query - on tap expand - sidebar icons show when collapsed
- when picking adress for the first time zoom to selection city bike
- customizable header - add mini widgets (needs standard class to pick widget to add)
- Components render more smoothly when enter editing
- review logs from react warnings in terminal and fix them
- make it possible to cancel edit changes
- User needs confirmation widget settings is OK
- add possiblity to add home local storage
- gh workflow should build and deploy seperatably
- horizontal scroll

## Refactors

- Electricity c service computes same computation multiple times unecessary
- rename everything so it has the same naming convention
- Refactor widget data fetching for common architecture and classes
- missing standard fetching for news and travel card (more?)

## Later

### Widgets

- rate your stay
- App position data for home state, not HAS
- Home assistant iframe widget
- Expenses
- Shopping list with geo tracking
- Electricity advice

### New Integrations

- Forbrukerrådet
- Norges bank
- Yr badetemperatur
- Politet
- Bring
