# Heimr

Heimr is a home dashboard that provides useful information about your household and local conditions.

Feel free to contribute.

![Screenshot of dashboard 01.12.23](doc/img/dash.png)

# Backlog – Heimr

## Bugs

- widgets sometime renders with to wide width
- electricity service trowing when getting to new month
- disable map when moving it around
- buttons in home profile goes over the surface

## MVP launch

- add info tab for configuration
- change bus to have a title identifier

## Hard launch

- accreditate all integrations
- review if you have rights to use image
- write about privacy etc.

## Improvements

- Components render more smoothly when enter editing
- review logs from react warnings in terminal and fix them
- cancel edit changes
- update data should be displayed as small spinner in right corner
- Needs confirmation config is OK
- config file fully configurable
- home local storage
- gh workflow should build and deploy seperatably
- horizontal scroll
- sidebar icons show when collapsed

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

### Integration

- Forbrukerrådet
- Norges bank
- Yr badetemperatur
- Politet
- Bring
