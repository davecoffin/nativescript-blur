[![Twitter URL](https://img.shields.io/badge/twitter-davecoffin-blue.svg)](https://twitter.com/davecoffin)




## iOS
<img src="https://github.com/davecoffin/nativescript-blur/blob/master/blur.gif?raw=true" height="320" > 
On iOS, you can blur pretty much anything, but the coolest thing to do is blur a transparent view covering what you want blurred. This way everything behind that view gets blurred. 

## Development for Android is underway, and in the mean time I have implemented some placeholder functionality for Android.
<img src="https://github.com/davecoffin/nativescript-blur/blob/master/blurandroid.gif?raw=true" height="320" > 
If you pass `true` to the constructor (`let blur = new Blur(true)`), nothing will be different on iOS, but on Android I set the backgroundColor of the NativeScript view that you pass to either light semi transparent or dark semi transparent. So, if you are using this for a "dimmer" effect for modals and stuff, Android will work that way for now until I incorporate a blur library.

## Installation

```javascript
tns plugin add nativescript-blur
```

## Usage 


```js

import { Blur } from 'nativescript-blur';
let blur = new Blur(true); // pass true to enable limited usage on android (for now);

// Pick Date
makeKittyBlurry() {
    let kittyView = page.getViewById('kitty');
    blur.on(kittyView, 'kitty', 'light').then(() => {
        console.log('Kitty has become blurry.');
    }).catch(e => {
        console.dir(e);
    });
}

clearUpKitty() {
    blur.off('kitty').then(() => {
        console.log('Kitty has cleared up.')
    });
}

```

## API

`on(view, keyTitle, theme?, duration?): Promise;`

To turn it on, you must pass a view and a key name. The key name can be anything, you use it to turn it off. This way you can blur different things at different times. You can pass a custom duration. The duration is in seconds, for example if you pass `.2` the animation will last .2 seconds. 
Supported themes for iOS are:
```js
dark
extraDark
light
extraLight
regular
prominent
```
Play around with the themes to see which looks the best, and learn more about these options here: https://developer.apple.com/documentation/uikit/uiblureffectstyle

Supported themes for Android are:
```js
light
dark
```

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
If there is no `ios` property on the element you pass or `addSubview` doesn't exist on the ios property, it will return an error.

On Android, the view must be a view that supports the NativeScript backgroundColor attribute, which most do. For example you could have a view like this:
```
<StackLayout id="welcome_overlay">
    <Label text="Welcome!" />
    <Label text="This is my brand new app, its not a new brand app, this is my favorite app, because it is my app. Its a brand new app." />
    <Image src="res://mejumping" />
</StackLayout>
```
And you could pass
`this.blur.on(page.getViewById('welcome_overlay'), 'welcome_overlay', 'dark');`
and it would darken the background of the StackLayout. Check out the source of the demo if you need more info on how it currently works on Android.

`off(keyTitle, duration?): Promise;`

Off animates the blur off. Pass it the key you used to create it. If the key doesnt exist (the view is not blurry) it will return an error.

    
## License

Apache License Version 2.0, January 2004
