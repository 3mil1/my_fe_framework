REPO >  https://github.com/3mil1/my_fe_framework

# my_framework

is React-like framework. It uses [JSX](https://en.wikipedia.org/wiki/JSX_(JavaScript))
for rendering components and [Babel](https://en.wikipedia.org/wiki/Babel_(transcompiler))
as transcompiler.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Running

```sh
node dist/bundle.js
```

# FIMI api
## Overview
### Add FIMI to your project
***
1. Open HTML page, add an empty `<div>` and set unique `id` HTML attribute.
2. Next, add `<script>` tag before closing `</body>` tag. Add to `src` attribute `bundle.js` (filename can be changed in
   `webpack.config.js`.
### Create components 
***
<mark >TODO</mark >
### Creating elements
***
Element is an object with `type`, `configs` and `props`. `Vdom.createElement` creates that object.
### render()
***
Render an element into the DOM in the provided container.

## Attributes
### checked
***
The `<checked>` is used to set whether the component is checked or not. It's supported by `<input>` tag. The type of `input` has to be `checkbox` or `radio`.
### className
***
`className` is used to specify CSS class.
### htmlFor
***
The `htmlFor` is used in labels, and it refers to the `id` this label associated with.
### style
***
The `style` attribute sets the style of an element.
### value
***
The `value` attribute specifies the value of an element. It's supported by `<input>`, `<select>` and `<textarea>` tags.
## Supported events
### Keyboard events
***
Names: `onKeyDown onKeyPress onKeyUp` <br/>
Supports common keyboars events (`key, keyCode, ctrlKey` and etc).
### Focus events
***
Names: `onFocus onBlur`
### Mouse events
***
Names: `onClick onDblClick onMouseEnter` and etc.

# FIMI state management
There's a system of store and reducers to manage the state.
## Reducer
Reducer is a function that takes the current `state` and an `action` as arguments and returns new state. <br/>
`(state, action) => newState`
### combineReducers(reducers)
***
The `combineReducers` function helps combine different reducing functions into one. It is usefull when the app becomes
more complex and there are more than one reducing functions managing independent parts of the state each. You can define
each reducer with a key name. The result of this function is a single state object you can pass as an argument when
creating `new Store`. <br/>
**For example:** <br/>
`combineReducers({ first: myFirstReducer, second: mySecondReducer })`.
## Store
A store is a class that holds the application's state tree. 
### Store methods
***
`getState()` returns current state of the store<br/>
`dispatch(action)` applies changes to the store's state<br/>
`subscribe(listener)` adds a change listener. Fire the function returned by `subscribe` to unsubscribe the listener.


## Credits

Made with [createapp.dev](https://createapp.dev/)
