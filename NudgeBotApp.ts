import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
    IHttp,
    IRead,
    IModify,
    IPersistence,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IMessage, IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';
import { 
    ApiEndpoint, 
    ApiSecurity, 
    ApiVisibility, 
    IApiEndpointInfo, 
    IApiRequest, 
    IApiResponse 
} from '@rocket.chat/apps-engine/definition/api';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { settings } from './config/Settings';
import { PhoneCommand } from './commands/PhoneCommand';
import { Endpoint } from './endpoints/test_endpoint';
import { GitHubWebhookEndpoint } from './endpoints/GitHubWebhookEndpoint';


export class NudgeBotApp extends App {
    // private prHandler: GitHubPRHandler;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        // this.prHandler = new GitHubPRHandler();
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        await Promise.all(
            settings.map((setting) =>
                configuration.settings.provideSetting(setting)
            )
        );

        await Promise.all(
              [configuration.slashCommands.provideSlashCommand(new PhoneCommand())]
        );

        // Register API endpoints
        await configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new GitHubWebhookEndpoint(this)],
        });
    }

}

