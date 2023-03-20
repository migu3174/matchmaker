interface EmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

interface EmbedImage {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

interface EmbedThumbnail {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

interface EmbedVideo {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

interface EmbedProvider {
    name?: string;
    url?: string;
}

interface EmbedAuthor {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

interface Embed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
}

type AllowedMentionsTypes = 'everyone' | 'users' | 'roles';

interface AllowedMentions {
    parse?: AllowedMentionsTypes[];
    roles?: string[];
    users?: string[];
    replied_user?: boolean;
}

interface Component {
    type: number;
    style?: number;
    label?: string;
    emoji?: {
        id?: string;
        name?: string;
        animated?: boolean;
    };
    custom_id?: string;
    url?: string;
    disabled?: boolean;
    components?: Component[];
}

interface Attachment {
    id: string;
    filename: string;
    content_type: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    description?: string;
    ephemeral?: boolean;
}

export interface ExecuteWebhookParams {
    content?: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    files?: Array<Buffer | string | File>;
    embeds?: Embed[];
    allowed_mentions?: AllowedMentions;
    components?: Component[];
    payload_json?: string;
    attachments?: Attachment[];
    flags?: number;
    thread_name?: string;
}
