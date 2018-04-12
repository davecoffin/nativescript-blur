import { Observable } from "tns-core-modules/data/observable";
import { Blur } from "nativescript-blur";
import { Page } from "tns-core-modules/ui/page";
import * as ImageSource from "tns-core-modules/image-source";
import * as app from "tns-core-modules/application";

export class HelloWorldModel extends Observable {
    constructor(page) {
        super();
        this.page = page;
        this.blur = new Blur();
    }

    private blur: Blur;
    private page: Page;

    public blurCat() {
        let view: any = this.page.getViewById("cat");
        this.blur
            .on(view, "kitty", 10) // 25 max
            .then((imageSource?: any) => {
                if (app.android) {
                    let image: any = this.page.getViewById("cat");
                    image.imageSource = imageSource;
                }
                console.log("The kitty is now mayor or Blurtown.");
            })
            .catch(this.handleError);
    }

    public blurCatLight() {
        let view = this.page.getViewById("cat");
        this.blur.on(view, "kitty", 10, "light", 1).catch(this.handleError);
    }

    public unBlurCat() {
        this.blur
            .off("kitty")
            .then((src?: any) => {
                if (app.android) {
                    let image: any = this.page.getViewById("cat");

                    // Here we're loading from URL, because we're
                    // assigning URL in XML, if you have assigned
                    // app resource in XML, you would want to
                    // .fromResource() here. for more info
                    // https://docs.nativescript.org/cookbook/image-source
                    ImageSource.fromUrl(src).then(imageSource => {
                        image.imageSource = imageSource;
                    });
                }
                console.log("The kitty is now BlurFree!");
            })
            .catch(this.handleError);
    }

    public blurBg(args) {
        let view = this.page.getViewById("dimmer");
        this.blur
            .on(view, "dimmer", 10, args.object.id)
            .catch(this.handleError);
    }

    public blurBgLight() {
        let view = this.page.getViewById("dimmer");
        this.blur.on(view, "dimmer", 10, "light", 2).catch(this.handleError);
    }

    public unBlurBg() {
        this.blur.off("dimmer").catch(this.handleError);
    }

    private handleError(error) {
        console.log("There was an error");
        console.dir(error);
    }
}
