import * as app from "tns-core-modules/application";
import * as frameModule from "tns-core-modules/ui/frame";
import * as imageSource from "tns-core-modules/image-source";
declare var com: any;

export class Blur {
    constructor() {
        // Initialize blurkit
        com.wonderkiln.blurkit.BlurKit.init(app.android.context);
    }

    private nsViewMap: any = {};
    public on(nsView, viewName, radius, theme?, duration?) {
        return new Promise((resolve, reject) => {
            if (radius < 1 || radius > 25) {
                reject("Radius should be between 1 - 25 (inclusive)");
            } else {
                if (!this.nsViewMap[viewName]) {
                    this.nsViewMap[viewName] = nsView.src;
                    console.log(this.nsViewMap[viewName]);
                    resolve(
                        imageSource.fromNativeSource(
                            com.wonderkiln.blurkit.BlurKit
                                .getInstance()
                                .blur(nsView.android, radius)
                        )
                    );
                } else {
                    reject("This view is already blurred");
                }
            }
        });
    }

    public off(viewName, duration?) {
        return new Promise((resolve, reject) => {
            if (this.nsViewMap[viewName]) {
                console.log(this.nsViewMap[viewName]);
                resolve(this.nsViewMap[viewName]);
                delete this.nsViewMap[viewName];
            } else {
                reject("View not found");
            }
        });
    }
}
