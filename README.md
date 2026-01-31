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

## Improvements

- review logs from react warnings in terminal and fix them
- cancel edit changes
- update data should be displayed as small spinner in right corner
- Needs confirmation config is OK
- config file fully configurable
- home local storage
- gh workflow should build and deploy seperatably
- horizontal scroll

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
