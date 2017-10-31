export declare class Blur {
    constructor();
    private effectViewMap;
    on(
        nsView: any,
        viewName: any,
        radius: number,
        theme?: any,
        duration?: any
    ): Promise<{}>;
    off(viewName: any, duration?: any): Promise<{}>;
}
