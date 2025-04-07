import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';

export enum AppSetting {
    GitHubAppId = 'github_app_id',
    GitHubPrivateKey = 'github_private_key',
    GitHubWebhookSecret = 'github_webhook_secret',
}

export const settings: Array<ISetting> = [
    {
        id: AppSetting.GitHubAppId,
        type: SettingType.STRING,
        public: false,
        required: true,
        packageValue: '',
        i18nLabel: 'GitHub App ID',
    },
    {
        id: AppSetting.GitHubPrivateKey,
        type: SettingType.STRING,
        multiline: true,
        public: false,
        required: true,
        packageValue: '',
        i18nLabel: 'GitHub Private Key (PEM format)',
    },
    {
        id: AppSetting.GitHubWebhookSecret,
        type: SettingType.STRING,
        public: false,
        required: true,
        packageValue: '',
        i18nLabel: 'GitHub Webhook Secret',
    },
];
