import { Observable } from 'tns-core-modules/data/observable';
import { Blur } from 'nativescript-blur';
import { Page } from 'tns-core-modules/ui/page';

export class HelloWorldModel extends Observable {

    constructor(page) {
        super();
        this.page = page;
        this.blur = new Blur();
        
    }

    private blur: Blur;
    private page: Page;

    public blurCat() {
        let view = this.page.getViewById('cat');
        this.blur.on(view, 'kitty').then(() => {
            console.log('The kitty is now mayor or Blurtown.')
        }).catch(this.handleError);
    }

    public blurCatLight() {
        let view = this.page.getViewById('cat');
        this.blur.on(view, 'kitty', 'light', 1).catch(this.handleError);
    }

    public unBlurCat() {
        this.blur.off('kitty').catch(this.handleError);
    }

    public blurBg() {
        let view = this.page.getViewById('bgimage');
        this.blur.on(view, 'bgimage').catch(this.handleError);
    }

    public blurBgLight() {
        let view = this.page.getViewById('bgimage');
        this.blur.on(view, 'bgimage', 'light', 2).catch(this.handleError);
    }

    public unBlurBg() {
        this.blur.off('bgimage').catch(this.handleError);
    }

    private handleError(error) {
        console.dir(error);
    }
}
