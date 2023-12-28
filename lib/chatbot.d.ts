export declare class Chatbot {
    private ctx;
    private model;
    private api_url;
    private api_key;
    private bot_name;
    private max_tokens;
    private temperature;
    private presence_penalty;
    private frequency_penalty;
    memory_dir: string;
    private system_prompt;
    constructor(ctx: any, api_url: string, api_key: string, bot_name: string, model: string, max_tokens: number, temperature: number, presence_penalty: number, frequency_penalty: number, memory_dir: string, system_prompt: string);
    private truncate_conversation;
    ask(messages: any[]): Promise<any>;
    load_memory(uid: string): any;
    save_memory(uid: string, memory: Array<object>, message?: object): void;
    get_balance(): Promise<any>;
}
