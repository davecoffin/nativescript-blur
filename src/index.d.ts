import { View } from "@nativescript/core";
export declare class Blur {
    private effectViewMap;
    on(nsView: View, viewName: string, radius: number, theme?: 'dark' | 'extraDark' | 'light' | 'extraLight' | 'regular' | 'prominent', duration?: number): Promise<unknown>;
    off(viewName: string, duration?: number): Promise<unknown>;
}