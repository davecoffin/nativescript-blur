
export class Blur {
    constructor(dimOnAndroid?) {
        if (dimOnAndroid) this.dimOnAndroid = true;
    }
    // removed blurkit for now.
    private nsViewMap: any = {};
    private android: any;
    private instance;
    private dimOnAndroid: boolean = false;
    public on(nsView, viewName, theme?, duration?) {
        if (!theme) theme == 'dark';
        if (duration) {
            duration = duration*1000; //convert to ms.
        } else {
            duration = 300;
        }
        return new Promise((resolve, reject) => {
            if (this.dimOnAndroid) {
                if (!this.nsViewMap[viewName]) {
                    this.nsViewMap[viewName] = nsView;
                    nsView.opacity = 0;
                    nsView.backgroundColor = 'rgba(0,0,0,0.8)';
                    if (theme == 'light') nsView.backgroundColor = 'rgba(255,255,255,0.8)';
                    nsView.animate({
                        opacity: 1,
                        duration: duration
                    }).then(() => {
                        resolve();
                    })
                }
            }
        })
    }

    public off(viewName, duration?) {
        return new Promise((resolve, reject) => {
            if (this.dimOnAndroid) {
                if (duration) {
                    duration = duration*1000; //convert to ms.
                } else {
                    duration = 300;
                }
                if (this.nsViewMap[viewName]) {
                    this.nsViewMap[viewName].animate({
                        opacity: 0,
                        duration: duration
                    }).then(() => {
                        this.nsViewMap[viewName].backgroundColor = 'transparent';
                        this.nsViewMap[viewName].opacity = 1;
                        delete this.nsViewMap[viewName];
                        resolve();
                    })
                }
                
            }
            resolve();
        })   
    }
}
