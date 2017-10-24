[![Twitter URL](https://img.shields.io/badge/twitter-%40MultiShiv19-blue.svg)](https://twitter.com/davecoffin)


## This plugin is not compatible on Android, as there is no suitable API.

## iOS
<img src="https://github.com/davecoffin/nativescript-modal-datetimepicker/blob/master/assets/iosdatepicker.gif?raw=true" height="320" > 

## Installation

```javascript
tns plugin add nativescript-blur
```

## Usage 


```js

import { Blur } from 'nativescript-blur';
let blur = new Blur();

// Pick Date
makeKittyBlurry() {
    let kittyView = page.getViewById('kitty');
    blur.on(kittyView, 'kitty', 'light');
}

clearUpKitty() {
    blur.off('kitty');
}

```

## API

`on(view, keyTitle, theme): void;`

To turn it on, you must pass a view and a key name. The key name can be anything, you use it to turn it off. This way you can blur different things at different times.
The view needs to be a nativescript view that has an `ios` property, and that property must support `addSubview`. Here are some examples of NativeScript UI elements you can pass:
```js
StackLayout
GridLayout
AbsoluteLayout
DockLayout
ScrollView
Image
Label
```


`off(keyTitle): void;`

Off animates the blur off. Pass it the key you used to create it. 

    
## License

Apache License Version 2.0, January 2004
