# Heimr

Heimr is a home dashboard that provides useful information about your household and local conditions.

Feel free to contribute.

![Screenshot of dashboard 01.12.23](doc/img/dash.png)

# Backlog – Heimr

## Bugs

- widgets sometime renders with to wide width
- electricity service trowing when getting to new month
- disable map when moving it around
- adding new user does not await for result

## MVP launch

- designing on small laptop will be nightmare
  - move header to be editable as well
  - height should be calculated dynamically

## Improvements

- cancel edit changes
- update data should be displayed as small spinner in right corner
- Needs confirmation config is OK
- config file fully configurable
- delay to fetchers only in dev mode (BE and FE)
- gh workflow should build and deploy seperatably

## Refactors

- Electricity c service computes same computation multiple times unecessary
- rename everything so it has the same naming convention

Data fetching:
Refactor widget data fetching architecture

- missing for news, travel card (more?)

## Later

### Widgets

- App position data for home state, not HAS
- Home assistant iframe widget
- Expenses
- Shopping list with geo tracking
- Electricity advice
