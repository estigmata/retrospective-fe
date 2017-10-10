# Retrospective

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Material Design

### Step 1: Install Angular Material and Angular CDK

> npm install --save @angular/material @angular/cdk

### Step 2: Animations

Some Material components depend on the Angular animations module in order to be able to do more advanced transitions. If you want these animations to work in your app, you have to install the @angular/animations module and include the BrowserAnimationsModule in your app.

> npm install --save @angular/animations

```javascript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

If you don't want to add another dependency to your project, you can use the NoopAnimationsModule.

```javascript
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [NoopAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

### Step 3: Import the component modules

Import the NgModule for each component you want to use:

```javascript
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  ...
  imports: [MdButtonModule, MdCheckboxModule],
  ...
})
export class PizzaPartyAppModule { }
```

Alternatively, you can create a separate NgModule that imports all of the Angular Material components that you will use in your application. You can then include this module wherever you'd like to use the components.

```javascript
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule],
  exports: [MdButtonModule, MdCheckboxModule],
})
export class MyOwnCustomMaterialModule { }
```

Whichever approach you use, be sure to import the Angular Material modules after Angular's BrowserModule, as the import order matters for NgModules.

### Step 4: Include a theme

Including a theme is required to apply all of the core and theme styles to your application.

To get started with a prebuilt theme, include one of Angular Material's prebuilt themes globally in your application. If you're using the Angular CLI, you can add this to your styles.css:

```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

### Step 5: Gesture Support

Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures. In order to get the full feature-set of these components, HammerJS must be loaded into the application.

To install via npm, use the following command:

> npm install --save hammerjs

After installing, import it on your app's entry point (e.g. src/main.ts).

```javascript
import 'hammerjs';
```

### Step 6 (Optional): Add Material Icons

If you want to use the md-icon component with the official Material Design Icons, load the icon font in your index.html.

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

For more information on using Material Icons, check out the Material Icons Guide.

Note that md-icon supports any font or svg icons; using Material Icons is one of many options.
