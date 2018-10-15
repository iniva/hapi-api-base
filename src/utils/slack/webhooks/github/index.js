import Webhook from 'Utils/slack/webhooks';
import { buildData } from './helpers';

export default class GithubWebhook extends Webhook {
    constructor(url, headers, payload) {
        super(url);

        this.data = buildData(headers, payload);
    }
}
