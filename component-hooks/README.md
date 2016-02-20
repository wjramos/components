# Component Hooks

## Intent

This will create class listeners where on page load, if any classes corresponding to a particular component are found, it will attempt to bind a new instance of a component for each unique instance of the class. Each component should have in place a kill-switch, where if necessary data is not found on the mapped element, the component does not load.


## Components Available

- `.js-sitewide-overlay` => new SitewideOverlay ( components/sitewide-overlay )