export declare class Blur {
    constructor(dimOnAndroid?: any);
    private effectViewMap;
    on(nsView: any, viewName: any, theme?: any, duration?: any): Promise<{}>;
    off(viewName: any, duration?: any): Promise<{}>;
}
