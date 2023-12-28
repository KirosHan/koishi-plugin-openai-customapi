import { Schema } from 'koishi';
export interface Config {
    api_url: string;
    api_key: string;
    model: string;
    bot_name: string;
    default_personality: string;
    default_personality_flag: boolean;
    appel_flag: boolean;
    include_bot_name_flag: boolean;
    private_message_flag: boolean;
    private_message_quote_flag: boolean;
    max_tokens: number;
    temperature: number;
    presence_penalty: number;
    frequency_penalty: number;
    memory_dir: string;
}
export declare const Config: Schema<Config>;
