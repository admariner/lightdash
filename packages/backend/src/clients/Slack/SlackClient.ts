import { App, Block, LogLevel } from '@slack/bolt';

import { SlackChannel } from '@lightdash/common';
import { LightdashConfig } from '../../config/parseConfig';
import Logger from '../../logger';
import { SlackAuthenticationModel } from '../../models/SlackAuthenticationModel';
import { slackOptions } from './SlackOptions';

type SlackClientDependencies = {
    slackAuthenticationModel: SlackAuthenticationModel;
    lightdashConfig: LightdashConfig;
};

const CACHE_TIME = 1000 * 10 * 60; // 10 minutes
const cachedChannels: Record<
    string,
    { lastCached: Date; channels: SlackChannel[] }
> = {};

export class SlackClient {
    slackAuthenticationModel: SlackAuthenticationModel;

    lightdashConfig: LightdashConfig;

    slackApp: App | undefined;

    public isEnabled: boolean = false;

    constructor({
        slackAuthenticationModel,
        lightdashConfig,
    }: SlackClientDependencies) {
        this.lightdashConfig = lightdashConfig;
        this.slackAuthenticationModel = slackAuthenticationModel;
        this.start();
    }

    async start() {
        if (this.lightdashConfig.slack?.appToken) {
            try {
                this.slackApp = new App({
                    ...slackOptions,
                    installationStore: {
                        storeInstallation: (i) =>
                            this.slackAuthenticationModel.createInstallation(i),
                        fetchInstallation: (i) =>
                            this.slackAuthenticationModel.getInstallation(i),
                    },
                    logLevel: LogLevel.INFO,
                    port: this.lightdashConfig.slack.port,
                    socketMode: true,
                    appToken: this.lightdashConfig.slack.appToken,
                });
            } catch (e: unknown) {
                Logger.error(`Unable to start Slack client ${e}`);
            }
            this.isEnabled = true;
        } else {
            Logger.warn(
                `Missing "SLACK_APP_TOKEN", Slack client will not work`,
            );
        }
    }

    async getChannels(organizationUuid: string): Promise<SlackChannel[]> {
        if (
            cachedChannels[organizationUuid] &&
            new Date().getTime() -
                cachedChannels[organizationUuid].lastCached.getTime() <
                CACHE_TIME
        ) {
            return cachedChannels[organizationUuid].channels;
        }

        Logger.debug('Fetching channels from Slack API');

        if (this.slackApp === undefined) {
            throw new Error('Slack app is not configured');
        }

        const installation =
            await this.slackAuthenticationModel.getInstallationFromOrganizationUuid(
                organizationUuid,
            );

        const conversations = await this.slackApp.client.conversations.list({
            token: installation?.token,
            types: 'public_channel',
            limit: 500,
        });

        const users = await this.slackApp.client.users.list({
            token: installation?.token,
        });

        const sortedChannels = (conversations.channels || [])
            .reduce<SlackChannel[]>(
                (acc, { id, name }) =>
                    id && name ? [...acc, { id, name: `#${name}` }] : acc,
                [],
            )
            .sort((a, b) => a.name.localeCompare(b.name));

        const sortedUsers = (users.members || [])
            .reduce<SlackChannel[]>(
                (acc, { id, name }) =>
                    id && name ? [...acc, { id, name: `@${name}` }] : acc,
                [],
            )
            .sort((a, b) => a.name.localeCompare(b.name));

        const channels = [...sortedChannels, ...sortedUsers];
        cachedChannels[organizationUuid] = { lastCached: new Date(), channels };
        return channels;
    }

    async joinChannels(organizationUuid: string, channels: string[]) {
        if (channels.length === 0) return;
        try {
            if (this.slackApp === undefined) {
                throw new Error('Slack app is not configured');
            }
            const installation =
                await this.slackAuthenticationModel.getInstallationFromOrganizationUuid(
                    organizationUuid,
                );
            const joinPromises = channels.map((channel) => {
                // Don't need to join user channels (DM)
                if (channel.startsWith('U')) return undefined;

                return this.slackApp?.client.conversations.join({
                    token: installation?.token,
                    channel,
                });
            });
            await Promise.all(joinPromises);
        } catch (e) {
            Logger.error(
                `Unable to join channels ${channels} on organization ${organizationUuid}: ${e}`,
            );
        }
    }

    async postMessage(message: {
        organizationUuid: string;
        text: string;
        channel: string;
        blocks?: Block[];
    }): Promise<void> {
        if (this.slackApp === undefined) {
            throw new Error('Slack app is not configured');
        }

        const { organizationUuid, text, channel, blocks } = message;

        const installation =
            await this.slackAuthenticationModel.getInstallationFromOrganizationUuid(
                organizationUuid,
            );

        await this.slackApp.client.chat
            .postMessage({
                token: installation?.token,
                channel,
                text,
                blocks,
            })
            .catch((e: any) => {
                Logger.error(
                    `Unable to postmessage on slack : ${JSON.stringify(e)}`,
                );
                throw e;
            });
    }
}
