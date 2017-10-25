import * as application from 'tns-core-modules/application';
import * as frame from "tns-core-modules/ui/frame";
import * as utilsModule from "tns-core-modules/utils/utils";

// declare module com {
//     export module wonderkiln {
//         export module blurkit {
//             export class BlurKit {
//                 public static init(context:android.content.Context): void;
//                 public blur(src:android.view.View, radius:number): android.graphics.Bitmap;
//                 public getInstance(): com.wonderkiln.blurkit.BlurKit;
//             }
//         }
//     }
// }

declare var com: any;

var blurKit = com.wonderkiln.blurkit.BlurKit;

export class Blur {
    constructor() {
        console.log('initting blurkit');
        blurKit.init(utilsModule.ad.getApplicationContext());
    }

    private effectViewMap: any = {};
    private android: any;

    public on(nsView, viewName, theme?, duration?) {
        
        return new Promise((resolve, reject) => {
            console.log('on');
            console.log(nsView.android);
            console.dir(blurKit);
            
            blurKit.getInstance().blur(nsView.android, 10);
            resolve();
        })
    }

    public off(viewName, duration?) {
        return new Promise((resolve, reject) => {
            console.log('off');
            resolve();
        })
        
        
    }
}
