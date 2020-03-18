import { View } from "@nativescript/core";

export class Blur {

    private effectViewMap: any = {};

    on(nsView: View, viewName: string, radius: number, theme?: 'dark' | 'extraDark' | 'light' | 'extraLight' | 'regular' | 'prominent', duration?: number) {
        return new Promise((resolve, reject) => {
            let iosView = nsView.ios;
            if (iosView && iosView.addSubview) {
                let blurEffect: UIBlurEffectStyle;
                if (!theme || theme == "dark") {
                    blurEffect = UIBlurEffectStyle.Dark;
                } else if (theme == "extraDark") {
                    blurEffect = UIBlurEffectStyle.ExtraDark;
                } else if (theme == "light") {
                    blurEffect = UIBlurEffectStyle.Light;
                } else if (theme == "extraLight") {
                    blurEffect = UIBlurEffectStyle.ExtraLight;
                } else if (theme == "regular") {
                    blurEffect = UIBlurEffectStyle.Regular;
                } else if (theme == "prominent") {
                    blurEffect = UIBlurEffectStyle.Prominent;
                } else {
                    // its dark if they pass a non supported theme.
                    blurEffect = UIBlurEffectStyle.Dark;
                }

                if (!duration && duration !== 0) {
                    // only if null or undefined, default .3 value
                    duration = 0.3;
                    // note: passing duration explicitly as 0, will skip animating effect and apply directly
                }
                if (!this.effectViewMap[viewName]) {
                    let iosView = nsView.ios;
                    let effectView = UIVisualEffectView.alloc().init();
                    effectView.frame = CGRectMake(
                        0,
                        0,
                        iosView.bounds.size.width,
                        iosView.bounds.size.height
                    );
                    effectView.autoresizingMask =
                        UIViewAutoresizing.FlexibleWidth |
                        UIViewAutoresizing.FlexibleHeight;
                    this.effectViewMap[viewName] = effectView;
                    iosView.addSubview(effectView);
                    iosView.bringSubviewToFront(effectView);
                    if (duration === 0) {
                        // apply effect immediately
                        effectView.effect = UIBlurEffect.effectWithStyle(
                            blurEffect
                        );
                        resolve();
                    } else {
                        // animate effect in
                        UIView.animateWithDurationAnimationsCompletion(
                            duration,
                            () => {
                                effectView.effect = UIBlurEffect.effectWithStyle(
                                    blurEffect
                                );
                            },
                            () => {
                                resolve();
                            }
                        );
                    }
                }
            } else {
                reject("Sorry, this view cannot be made blurry.");
            }
        });
    }

    off(viewName: string, duration?: number) {
        return new Promise((resolve, reject) => {
            if (!duration && duration !== 0) {
                // only if null or undefined, default .3 value
                duration = 0.3;
                // note: passing duration explicitly as 0, will skip animating effect and apply directly
            }
            if (this.effectViewMap[viewName]) {
                let effectView = this.effectViewMap[viewName];
                delete this.effectViewMap[viewName];
                if (duration === 0) {
                  // remove effect immediately
                  if (effectView) {
                    effectView.effect = null
                    effectView.removeFromSuperview();
                  }
                  resolve();
                } else {
                  UIView.animateWithDurationAnimationsCompletion(
                      duration,
                      () => {
                          if (effectView) {
                              effectView.effect = null;
                          }
                      },
                      () => {
                          if (effectView) {
                            effectView.removeFromSuperview();
                          }
                          resolve();
                      }
                  );
                }
            } else {
                reject("It's not blurry!");
            }
        });
    }
}
