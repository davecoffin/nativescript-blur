
export class Blur {
    constructor(dimOnAndroid?) {} // dimOnAndroid is ignored on iOS.

    private effectViewMap: any = {};

    public on(nsView, viewName, theme?, duration?) {
        return new Promise((resolve, reject) => {
            let iosView = nsView.ios;
            if (iosView && iosView.addSubview) {
                if (!theme || theme == 'dark') {
                    theme = UIBlurEffectStyle.Dark;
                } else {
                    theme = UIBlurEffectStyle.Light;
                }
                if (!duration) duration = .3;
                if (!this.effectViewMap[viewName]) {
                    let iosView = nsView.ios;
                    let effectView = UIVisualEffectView.alloc().init();
                    effectView.frame = CGRectMake(0, 0, iosView.bounds.size.width, iosView.bounds.size.height);
                    effectView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
                    this.effectViewMap[viewName] = effectView;
                    iosView.addSubview(effectView)
                    iosView.bringSubviewToFront(effectView);
                    UIView.animateWithDurationAnimationsCompletion(duration, () => {
                        effectView.effect = UIBlurEffect.effectWithStyle(theme);
                    }, () => {
                        resolve();
                    })
                }
            } else {
                reject('Sorry, this view cannot be made blurry.')
            }
            
        })
        
        
    }

    public off(viewName, duration?) {
        return new Promise((resolve, reject) => {
            if (!duration) duration = .3;
            if (this.effectViewMap[viewName]) {
                let effectView = this.effectViewMap[viewName];
                delete this.effectViewMap[viewName];
                UIView.animateWithDurationAnimationsCompletion(duration, () => {
                    effectView.effect = null;
                }, () => {
                    effectView.removeFromSuperview();
                    resolve();
                })
            } else {
                reject("It's not blurry!");
            }
        })
        
        
    }
}
