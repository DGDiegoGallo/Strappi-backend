"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const strapi_1 = require("@strapi/strapi");
const BASE_URL = process.env.CHUTES_BASE_URL || 'https://openrouter.ai/api/v1';
const API_KEY = process.env.CHUTES_API_KEY || '';
// Debug: verifica que la variable se cargó
console.log('CHUTES_API_KEY loaded?', !!API_KEY);
exports.default = strapi_1.factories.createCoreService('api::prompt.prompt', () => ({
    async chat(entity) {
        var _a, _b, _c, _d, _e;
        const { model = 'deepseek/deepseek-chat-v3-0324:free', system = '', user: userContent = '', temperature = 1, max_tokens = 1024, } = entity;
        if (!userContent)
            throw new Error('Prompt is empty');
        const headers = { 'Content-Type': 'application/json' };
        if (API_KEY)
            headers.Authorization = `Bearer ${API_KEY}`;
        // Debug: log headers to verify Authorization is included
        console.log('Headers sent to Chutes:', headers);
        let data;
        try {
            const payload = {
                model,
                messages: [
                    ...(system ? [{ role: 'system', content: system }] : []),
                    { role: 'user', content: userContent },
                ],
                temperature,
                max_tokens,
            };
            // Debug: log payload to compare with working curl request
            console.log('Body to Chutes:', JSON.stringify(payload));
            ({ data } = await axios_1.default.post(`${BASE_URL}/chat/completions`, payload, { headers }));
            return (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) !== null && _d !== void 0 ? _d : '';
        }
        catch (err) {
            console.error('Raw error from Chutes:', ((_e = err.response) === null || _e === void 0 ? void 0 : _e.data) || err);
            throw err;
        }
    },
}));
