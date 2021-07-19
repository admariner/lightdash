declare module '@rudderstack/rudder-sdk-node' {
    interface IdentifyPayload {
        userId: string;
        traits?: Record<string, any>;
    }
    interface TrackPayload {
        userId: string;
        event: string;
        properties?: Record<string, any>;
    }
    interface GroupPayload {
        userId: string;
        groupId: string;
        traits?: Record<string, any>;
    }
    interface AnalyticsOptions {
        flushAt?: number;
        flushInterval?: number;
        host?: string;
        enable?: boolean;
    }
    declare class Analytics {
        constructor(
            writeKey: string,
            dataPlaneUrl: string,
            options: AnalyticsOptions = {},
        );
        identify(payload: IdentifyPayload): void;
        track(payload: TrackPayload): void;
        group(payload: GroupPayload): void;
    }
    const Analytics: any;

    export default Analytics;
}
