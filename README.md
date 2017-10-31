[![Twitter URL](https://img.shields.io/badge/twitter-%40davecoffin-blue.svg)](https://twitter.com/davecoffin)
[![Twitter URL](https://img.shields.io/badge/twitter-%40MultiShiv19-blue.svg)](https://twitter.com/MultiShiv19)

[![NPM](https://nodei.co/npm/nativescript-blur.png)](https://nodei.co/npm/nativescript-blur/)

## iOS
<img src="https://github.com/shiv19/nativescript-blur/blob/master/blur.gif?raw=true" height="320" > 

On iOS, you can blur pretty much anything, but the coolest thing to do is blur a transparent view covering what you want blurred. This way everything behind that view gets blurred. 

## Android
<img src="https://github.com/shiv19/nativescript-blur/blob/master/blurandroid.gif?raw=true" height="320" > 

On android you can only blur image views currently. But you have control over how much you want to blur.
The android demo image is showing blur radius level 10.

Android image blurring is powered by wonderkiln/BlurKit-Android

## Installation

```javascript
tns plugin add nativescript-blur
```

### Important Setup, <Android ONLY>
In your project's `app/App_Resources/android/app.gradle` file add the following lines
inside the block for `defaultConfig`. Without this step, BlurKit won't work.

```
renderscriptTargetApi 25
renderscriptSupportModeEnabled true
```

## Usage 


```js

import { Blur } from 'nativescript-blur';
import * as app from "tns-core-modules/application";
let blur = new Blur(true); // pass true to enable limited usage on android (for now);

// Pick Date
makeKittyBlurry() {
    let kittyView = page.getViewById('kitty');
    blur.on(kittyView, 'kitty', 'light').then((imageSource) => {
        if (app.android) { // android only
            let image: any = this.page.getViewById("kitty");
            image.imageSource = imageSource; // replace the image source
            // with the image source that the plugin gives you
        }
        console.log('Kitty has become blurry.');
    }).catch(e => {
        console.dir(e);
    });
}

clearUpKitty() {
    blur.off('kitty').then((src) => {
        if (app.android) { // android only
            let image: any = this.page.getViewById("kitty");

            // Here we're loading from URL, because we're
            // assigning URL in XML, if you have assigned
            // app resource in XML, you would want to
            // .fromResource() here. for more info
            // https://docs.nativescript.org/cookbook/image-source
            ImageSource.fromUrl(src).then(imageSource => {
                image.imageSource = imageSource;
            });
        }
        console.log('Kitty has cleared up.')
    });
}

```

## API

`on(view, keyTitle, radius, theme?, duration?): Promise;`

Radius is for android. // not optional, must be between 1 - 25 (inclusive)

Theme and Duration are for iOS. // optional

To turn it on, you must pass a view, a key name and a number to set radius. The key name can be anything, you use it to turn it off. This way you can blur different things at different times. You can pass a custom duration. The duration is in seconds, for example if you pass `.2` the animation will last .2 seconds. 
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

On Android, only view of type Image is supported. And this method returns an image source which you have to assign
to the image element in your view (please refer demo/ sample code).

`off(keyTitle, duration?): Promise;`

Off animates the blur off. Pass it the key you used to create it. If the key doesnt exist (the view is not blurry) it will return an error.

    
## License

Apache License Version 2.0, January 2004

Copyright 2017 Dave Coffin, Shiva Prasad
