import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";

// function LinkTelegramPhoneForm() {
// 	return (
// 		<Form>
// 			<Form.Group className="mb-3" controlId="linkTelegramPhoneForm">
// 				<Form.Label>Phone number</Form.Label>
// 				<Form.Control type="phone" placeholder="Enter mobile phone" />
// 				<Form.Text className="text-muted">
// 					Enter your phone number to receive confirmation code.
// 				</Form.Text>
// 			</Form.Group>

// 			<Button variant="primary" type="button">
// 				Send
// 			</Button>
// 		</Form>
// 	);
// }

// function LinkTelegramCodeForm() {
// 	return (
// 		<Form>
// 			<Form.Group className="mb-3" controlId="linkTelegramCodeForm">
// 				<Form.Label>ex. 12345</Form.Label>
// 				<Form.Control type="phone" placeholder="Enter mobile phone" />
// 				<Form.Text className="text-muted">
// 					Enter your confirmation code.
// 				</Form.Text>
// 			</Form.Group>

// 			<Button variant="primary" type="button">
// 				Confirm
// 			</Button>
// 		</Form>
// 	);
// }

// function LinkTelegramPasswordForm() {
// 	return (
// 		<Form>
// 			<Form.Group className="mb-3" controlId="linkTelegramPasswordForm">
// 				<Form.Label>Password</Form.Label>
// 				<Form.Control type="phone" placeholder="Enter mobile phone" />
// 				<Form.Text className="text-muted">
// 					Enter your 2FA password.
// 				</Form.Text>
// 			</Form.Group>

// 			<Button variant="primary" type="button">
// 				Confirm
// 			</Button>
// 		</Form>
// 	);
// }

interface formProps {
	phone?: string;
	code?: string;
	password?: string;
}

// Можно вынести Form.Group в отдельный компонент и переиспользовать
//-------------
function LinkTelegramForm() {
	const [showCodeForm, setShowCodeForm] = useState(false);
	const [showPasswordForm, setShowPasswordForm] = useState(false);
	const [buttonText, setButtonText] = useState("Send");

	let phone: string;
	let code: string;
	let password: string;

	const submitHandler = () => {
		if (showPasswordForm) {
			console.log("confirmPassword");
			confirmPassword(password);
			return;
		}
		if (showCodeForm) {
			console.log("confirmCode");
			confirmCode(code);
			setShowPasswordForm(true);
			setButtonText("Confirm");
			return;
		}
		console.log("sendCode");
		sendCode(phone);
		setShowCodeForm(true);
	};

	const setPhone = (e: React.FormEvent<HTMLInputElement>): void => {
		phone = e.currentTarget.value;
	};
	const setCode = (e: React.FormEvent<HTMLInputElement>): void => {
		code = e.currentTarget.value;
	};
	const setPassword = (e: React.FormEvent<HTMLInputElement>): void => {
		password = e.currentTarget.value;
	};
	return (
		<Form onSubmit={submitHandler}>
			<Form.Group className="mb-3" controlId="phone" onChange={setPhone}>
				<Form.Label>Phone number</Form.Label>
				<Form.Control type="phone" placeholder="Enter mobile phone" />
				<Form.Text className="text-muted">
					Enter your phone number to receive confirmation code.
				</Form.Text>
			</Form.Group>

			{showCodeForm && (
				<Form.Group
					className="mb-3"
					controlId="code"
					onChange={setCode}
				>
					<Form.Label>Confirmation Code</Form.Label>
					<Form.Control type="code" placeholder="ex. 12345" />
					<Form.Text className="text-muted">
						Enter your confirmation code.
					</Form.Text>
				</Form.Group>
			)}

			{showPasswordForm && (
				<Form.Group
					className="mb-3"
					controlId="password"
					onChange={setPassword}
				>
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
//-------------

// interface containerProps {}
// interface containerState {
// 	showCodeForm: Boolean;
// 	showPasswordForm: Boolean;
// 	buttonText: string;
// }

export default function LinkTelegramContainer() {
	return (
		<Container fluid="md">
			<LinkTelegramForm />
		</Container>
	);
}

// class LinkTelegramContainer extends React.Component<containerProps, containerState> {
// 	constructor(props: containerProps) {
// 		super(props);
// 		this.state = {
//             showCodeForm: false,
//             showPasswordForm: false,
//             buttonText: "Send"
//         };
// 	}

// 	handleClick = () => {};

// 	componentDidMount() {}

// 	componentWillUnmount() {}

// 	render() {
// 		return (
// 			<Container fluid="md">
// 				<LinkTelegramForm
// 					showCodeForm={this.state.showCodeForm}
//                     showPasswordForm={this.state.showPasswordForm}
//                     buttonText = {this.state.buttonText}
// 				></LinkTelegramForm>
// 			</Container>
// 		);
// 	}
// }

function sendCode(phone: string): void {}

function confirmCode(code: string): void {}

function confirmPassword(pwd: string): void {}
