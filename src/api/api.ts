import {API} from "../config";
import {TelegramConfirmationData, TelegramSession} from "./types";

const userID = localStorage.getItem('user_id')

type FetchMethod = 'GET' | 'PUT' | 'POST'

type FetchConfig<Request, Response, TransformedResponse> = {
	url: string,
	body?: Request,
	headers?: Record<string, string>,
	method?: FetchMethod,
	transform?: (res: Response) => TransformedResponse
}

const customFetch = async <Request = never, Response = unknown, TransformedResponse = Response>(config: FetchConfig<Request, Response, TransformedResponse>) => {
	const method = config.method || 'GET'

	console.log(`
		[HTTP] ${method} on ${config.url}: body: ${config.body}
	`);

	const res = await fetch(config.url, {
		body: JSON.stringify(config.body),
		method,
		headers: {
			...config.headers,
			'Content-Type': 'application/json; charset=UTF-8'
		},
	})

	if (!res.ok) {
		console.log(`response: ${res.status}`);
		throw new Error(`responded with status ${res.status}`);
	}

	return res
		.json()
		.then<TransformedResponse>((data) => (
			!!config.transform ? config.transform(data) : data
		))
		.catch((err) => {
			throw new Error(err);
		});
}

export const fetchSendCode = (phone: string): Promise<TelegramConfirmationData> => {
	const url = `${API}/link/telegram/${userID}`;
	const body: TelegramSession = {phone};

	return customFetch<TelegramSession, TelegramConfirmationData>({
		url,
		body,
		method: 'PUT',
	})
}

export const fetchConfirmCode = async (key: string, phoneCode?: string): Promise<{}> => {
	const url = `${API}/link/telegram/${userID}/confirm`;
	const body: TelegramConfirmationData = {
		key,
		phone_code: phoneCode,
	}

	return customFetch<TelegramConfirmationData, {}>({
		url,
		body,
		method: 'PUT',
	})
}

export const fetchConfirmPassword = (pwd: string): void => { }