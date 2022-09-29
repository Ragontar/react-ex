import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { TelegramSession, TelegramConfirmationCode } from "../models/Models";

const API = "http://localhost:9080";

let telegramConfirmationCode: TelegramConfirmationCode = { key: "" };

function LinkTelegramForm() {
	const [showCodeForm, setShowCodeForm] = useState(false);
	const [showPasswordForm, setShowPasswordForm] = useState(false);
	const [buttonText, setButtonText] = useState("Send");

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			phone: { value: string };
			code: { value: string };
			password: { value: string };
		};

		if (showPasswordForm) {
			console.log(`confirmPassword(${target.password.value})`);
			confirmPassword(target.password.value);
			return;
		}
		if (showCodeForm) {
			console.log(`confirmCode(${target.code.value})`);
			telegramConfirmationCode.phone_code = target.code.value;
			confirmCode(telegramConfirmationCode)
				.then(() => {
					setShowPasswordForm(true);
				})
				.catch((err) => {
					console.log(err);
				});

			return;
		}
		console.log(`sendCode(${target.phone.value})`);

		sendCode(target.phone.value)
			.then((tcc) => {
				setShowCodeForm(true);
				setButtonText("Confirm");
				telegramConfirmationCode = tcc;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Form onSubmit={submitHandler}>
			<Form.Group className="mb-3" controlId="phone">
				<Form.Label>Phone number</Form.Label>
				<Form.Control type="phone" placeholder="Enter mobile phone" />
				<Form.Text className="text-muted">
					Enter your phone number to receive confirmation code.
				</Form.Text>
			</Form.Group>

			{showCodeForm && (
				<Form.Group className="mb-3" controlId="code">
					<Form.Label>Confirmation Code</Form.Label>
					<Form.Control type="code" placeholder="ex. 12345" />
					<Form.Text className="text-muted">
						Enter your confirmation code.
					</Form.Text>
				</Form.Group>
			)}

			{showPasswordForm && (
				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					<Form.Text className="text-muted">
						Enter your 2FA password.
					</Form.Text>
				</Form.Group>
			)}

			<Button variant="primary" type="submit">
				{buttonText}
			</Button>
		</Form>
	);
}

export default function LinkTelegramContainer() {
	return (
		<Container fluid="md">
			<LinkTelegramForm />
		</Container>
	);
}

async function sendCode(phone: string) {
	const ts: TelegramSession = { phone: phone };

	const body = JSON.stringify(ts);
	const method = "PUT";
	const url = `${API}/link/telegram/${localStorage.getItem(
		"user_id"
	)}`;

	console.log(`
        [HTTP] ${method} on ${url}: body: ${body}
    `);
	const resp = await fetch(url, {
		method: method,
		body: body,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});

	if (!resp.ok) {
		console.log(`response: ${resp.status}`);
		throw new Error(`responded with status ${resp.status}`);
	}

	return resp
		.json()
		.then((bodyJson) => {
			const tcc: TelegramConfirmationCode = {
				key: bodyJson.key,
			};

			return tcc;
		})
		.catch((err) => {
			throw new Error(err);
		});
}

async function confirmCode(tcc: TelegramConfirmationCode) {
	const body = JSON.stringify(tcc);
	const method = "PUT";
	const url = `${API}/link/telegram/${localStorage.getItem(
		"user_id"
	)}/confirm`;

	console.log(`
        [HTTP] ${method} on ${url}: body: ${body}
    `);
	const resp = await fetch(url, {
		method: method,
		body: body,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});

	if (!resp.ok) {
		console.log(`response: ${resp.status}`);
		throw new Error(`responded with status ${resp.status}`);
	}

	return;
}

function confirmPassword(pwd: string): void {}
