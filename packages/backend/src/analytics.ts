import Analytics from '@rudderstack/rudder-sdk-node';
import { DbUserDetails } from './database/entities/users';

const dataPlaneUrl = process.env.REACT_APP_RUDDERSTACK_DATAPLANE_URL;
const writeKey = process.env.REACT_APP_RUDDERSTACK_WRITE_KEY;

class NoopAnalytics extends Analytics {
    constructor() {
        super('noop', 'noop');
    }

    // eslint-disable-next-line class-methods-use-this
    identify() {}

    // eslint-disable-next-line class-methods-use-this
    track() {}

    // eslint-disable-next-line class-methods-use-this
    group() {}
}

export const analytics =
    dataPlaneUrl && writeKey
        ? new Analytics(writeKey, `${dataPlaneUrl}/v1/batch`)
        : new NoopAnalytics();

export const trackUserCreated = (user: DbUserDetails): void => {
    if (user.is_tracking_anonymized) {
        analytics.identify({
            userId: user.user_uuid,
        });
        if (user.organization_uuid) {
            analytics.group({
                userId: user.user_uuid,
                groupId: user.organization_uuid,
            });
        }
    } else {
        analytics.identify({
            userId: user.user_uuid,
            traits: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });
        if (user.organization_uuid) {
            analytics.group({
                userId: user.user_uuid,
                groupId: user.organization_uuid,
                traits: {
                    name: user.organization_name,
                },
            });
        }
    }
    analytics.track({
        userId: user.user_uuid,
        event: 'account_created',
    });
};
