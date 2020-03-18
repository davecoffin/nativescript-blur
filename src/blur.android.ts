import { Application, View, Image, ImageSource } from "@nativescript/core";
declare var com: any;

export class Blur {
    constructor() {
        // Initialize blurkit
        com.wonderkiln.blurkit.BlurKit.init(Application.android.context);
    }

    private nsViewMap: any = {};
    on(nsView: View | Image, viewName: string, radius: number, theme?: string, duration?: number) {
        return new Promise((resolve, reject) => {
            if (radius < 1 || radius > 25) {
                reject("Radius should be between 1 - 25 (inclusive)");
            } else {
                if (!this.nsViewMap[viewName] && nsView instanceof Image) {
                    this.nsViewMap[viewName] = nsView.src;
                    // console.log(this.nsViewMap[viewName]);
                    resolve(
                        new ImageSource(
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

    off(viewName: string, duration?: number) {
        return new Promise((resolve, reject) => {
            if (this.nsViewMap[viewName]) {
                // console.log(this.nsViewMap[viewName]);
                resolve(this.nsViewMap[viewName]);
                delete this.nsViewMap[viewName];
            } else {
                reject("View not found");
            }
        });
    }
}
