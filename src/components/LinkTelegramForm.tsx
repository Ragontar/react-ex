import {Button, Container, Form} from "react-bootstrap";
import React, {useCallback, useState} from "react";
import {telegramApiInstance} from "../api";
import {INITIAL_STATE} from "./consts";
import {FormValues} from "./types";

export const LinkTelegramForm: React.FC = () => {
	const [formState, setFormState] = useState<FormValues>(INITIAL_STATE)
	const [showPasswordForm, setShowPassowrdForm] = useState(false)
	const [buttonText, setButtonText] = useState("Send");

	const showCodeForm = !!formState._codeKey

	const updateFormField = useCallback(
		(key: string) =>
			(e: React.ChangeEvent<HTMLInputElement>) => (
				setFormState({
					...formState,
					[key]: e?.currentTarget?.value || ''
				})
			), [formState])

	const submitHandler = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault();
		const {_codeKey, code, phone, password} = formState

		if (showPasswordForm) {
			console.log(`confirmPassword(${password})`);
			telegramApiInstance.fetchConfirmPassword(password)
			return
		}
		if (showCodeForm && _codeKey) {
			telegramApiInstance
				.fetchConfirmCode(_codeKey, code)
				.then(() => setShowPassowrdForm(true))
			return
		}
		console.log(`sendCode(${phone})`);

		telegramApiInstance
			.fetchSendCode(phone)
			.then(({phone_code, key}) => {
				setButtonText("Confirm");
				setFormState({
					...formState,
					_codeKey: key,
					phone: phone_code || phone
				})
			})
			.catch(console.warn);
	}, [formState, showCodeForm, showPasswordForm, setFormState, setButtonText])

	return (
		<Container fluid="md">
			<Form onSubmit={submitHandler}>
				<Form.Group className="mb-3" controlId="phone">
					<Form.Label>Phone number</Form.Label>
					<Form.Control
						value={formState.phone}
						onChange={updateFormField('phone')}
						type="phone"
						placeholder="Enter mobile phone"
					/>
					<Form.Text className="text-muted">
						Enter your phone number to receive confirmation code.
					</Form.Text>
				</Form.Group>

				{showCodeForm && (
					<Form.Group className="mb-3" controlId="code">
						<Form.Label>Confirmation Code</Form.Label>
						<Form.Control
							value={formState.code}
							onChange={updateFormField('code')}
							type="text"
							placeholder="ex. 12345"
						/>
						<Form.Text className="text-muted">
							Enter your confirmation code.
						</Form.Text>
					</Form.Group>
				)}

				{showPasswordForm && (
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={formState.password}
							onChange={updateFormField('password')}
							type="password"
							placeholder="Password"
						/>
						<Form.Text className="text-muted">
							Enter your 2FA password.
						</Form.Text>
					</Form.Group>
				)}

				<Button variant="primary" type="submit">
					{buttonText}
				</Button>
			</Form>
		</Container>
	);
}
