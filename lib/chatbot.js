"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatbot = void 0;
const fs_1 = __importDefault(require("fs"));
class Chatbot {
    constructor(ctx, api_url, api_key, bot_name, model, max_tokens, temperature, presence_penalty, frequency_penalty, memory_dir, system_prompt) {
        this.ctx = ctx;
        this.api_url = api_url;
        this.api_key = api_key;
        this.bot_name = bot_name;
        this.model = model;
        this.max_tokens = max_tokens;
        this.temperature = temperature;
        this.presence_penalty = presence_penalty;
        this.frequency_penalty = frequency_penalty;
        this.memory_dir = memory_dir;
        this.system_prompt = system_prompt;
    }
    truncate_conversation(messages) {
        while (true) {
            const full_conversation = messages.map(m => m.content).join('\n');
            if (full_conversation.length > this.max_tokens && messages.length > 1) {
                messages.splice(1, 1);
            }
            else {
                break;
            }
        }
    }
    async ask(messages) {
        this.truncate_conversation(messages);
        const response = await this.ctx.http.axios({
            url: this.api_url,
            headers: { 'Authorization': `Bearer ${this.api_key}`, },
            data: {
                "model": this.model,
                "messages": messages,
                "temperature": this.temperature,
                "presence_penalty": this.presence_penalty,
                "frequency_penalty": this.frequency_penalty,
            },
            method: 'post',
        });
        return response.data.choices[0].message;
    }
    load_memory(uid) {
        /**
         * Load the conversation from a JSON file
         */
        const filename = `${this.memory_dir}/${uid}.json`;
        if (fs_1.default.existsSync(filename)) {
            const fileContent = fs_1.default.readFileSync(filename, 'utf-8');
            return JSON.parse(fileContent);
        }
        else {
            return [{
                    "role": "system",
                    "content": `${this.system_prompt}你的名字是${this.bot_name}。`,
                }];
        }
    }
    save_memory(uid, memory, message) {
        /**
         * Save the conversation to a JSON file
         */
        if (!fs_1.default.existsSync(this.memory_dir)) {
            fs_1.default.mkdirSync(this.memory_dir);
        }
        const filename = `${this.memory_dir}/${uid}.json`;
        if (message) {
            memory.push(message);
        }
        const fileContent = JSON.stringify(memory, null, 2);
        fs_1.default.writeFileSync(filename, fileContent, 'utf-8');
    }
    async get_balance() {
        const response = await this.ctx.http.axios({
            url: "https://api.openai.com/dashboard/billing/credit_grants",
            headers: {
                'Authorization': `Bearer ${this.api_key}`,
                'Content-Type': 'application/json',
            },
            method: 'get',
        });
        return response.data.total_available;
    }
}
exports.Chatbot = Chatbot;
