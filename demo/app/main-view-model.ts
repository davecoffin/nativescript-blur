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
        this.blur.on(view, 'kitty');
    }

    public blurCatLight() {
        let view = this.page.getViewById('cat');
        this.blur.on(view, 'kitty', 'light');
    }

    public unBlurCat() {
        this.blur.off('kitty');
    }

    public blurBg() {
        let view = this.page.getViewById('bgimage');
        this.blur.on(view, 'bgimage');
    }

    public blurBgLight() {
        let view = this.page.getViewById('bgimage');
        this.blur.on(view, 'bgimage', 'light');
    }

    public unBlurBg() {
        this.blur.off('bgimage');
    }
}
