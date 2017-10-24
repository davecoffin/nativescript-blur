
export class Blur {
    constructor() {}

    private effectViewMap: any = {};

    public on(nsView, viewName, theme?) {
        if (!theme || theme == 'dark') {
            theme = UIBlurEffectStyle.Dark;
        } else {
            theme = UIBlurEffectStyle.Light;
        }
        if (!this.effectViewMap[viewName]) {
            let iosView = nsView.ios;
            let effectView = UIVisualEffectView.alloc().init();
            effectView.frame = CGRectMake(0, 0, iosView.bounds.size.width, iosView.bounds.size.height + 20);
            effectView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
            this.effectViewMap[viewName] = effectView;
            
            iosView.addSubview(effectView)
            iosView.bringSubviewToFront(effectView);
            UIView.animateWithDurationAnimations(0.4, () => {
                effectView.effect = UIBlurEffect.effectWithStyle(theme);
            })
        }
        
    }

    public off(viewName) {
        if (this.effectViewMap[viewName]) {
            UIView.animateWithDurationAnimationsCompletion(0.3, () => {
                this.effectViewMap[viewName].effect = null;
            }, () => {
                this.effectViewMap[viewName].removeFromSuperview();
                delete this.effectViewMap[viewName];
            })
        }
        
    }
}
