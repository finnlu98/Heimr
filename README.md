# Heimr

Heimr is a home dashboard that provides useful information about your household and local conditions.

Feel free to contribute.

![Screenshot of dashboard 01.12.23](img/dash.png)

# Backlog – Heimr

## Bugs

- widgets sometime renders with to wide width
- electricity service trowing when getting to new month

## MVP launch

## Improvements

- Needs confirmation config is OK
- config file fully configurable

## Refactors

- Electricity c service computes same computation multiple times unecessary
- rename everything so it has the same naming convention

Data fetching:
Refactor widget data fetching architecture

- Move data fetching from individual widget components to contexts
- Options: Individual widget contexts OR centralized dashboard context
- Benefits: Eliminate circular dependencies, enable data sharing (e.g., Header), better caching

## Later

### Widgets

- App position data for home state, not HAS
- Home assistant iframe widget
- Expenses
- Shopping list with geo tracking
- Electricity advice
