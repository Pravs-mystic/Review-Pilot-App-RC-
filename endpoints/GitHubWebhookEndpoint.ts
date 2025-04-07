// endpoint.ts
import { HttpStatusCode, IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse } from '@rocket.chat/apps-engine/definition/api';

export class GitHubWebhookEndpoint extends ApiEndpoint {
    public path = 'github-webhook';

    public async post(
        request: IApiRequest, endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<IApiResponse> {
        const body = request.content;

        // log the request body
        // console.log('Received GitHub webhook:', JSON.stringify(body, null, 2));
        
        // Check for pull request event
        if (body && body.action && body.pull_request) {
            const pr = body.pull_request;
            const sender = body.sender?.login || 'someone';
            const repo = body.repository?.full_name || 'a repo';

            const messageText = `🔔 Pull Request **${body.action}** by **${sender}** in **${repo}**:
**Title:** ${pr.title}
**URL:** ${pr.html_url}`;

            const room = await read.getRoomReader().getByName('general');
            if (room) {
                const msg = modify.getCreator().startMessage().setText(messageText).setRoom(room);
                await modify.getCreator().finish(msg);
            }
        }

        return {
            status: 200,
            content: { success: true },
        };
    }
}