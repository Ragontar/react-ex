import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";

interface loginProps {
	name: string;
}

interface buttonProps {
	children: string;
}

export function LoginForm(loginProps: loginProps): JSX.Element {
	return (
		<div>
			<h1>Нюхай беброчку {loginProps.name}</h1>
		</div>
	);
}

export function BootstrapButtonEx(): JSX.Element {
	return (
			<Container className="p-3">
				<Button>Click Me</Button>
			</Container>
	);
}

export function ExampleToast(props: buttonProps): JSX.Element {
	const [show, toggleShow] = useState(true);

	return (
		<>
			{!show && (
				<Button onClick={() => toggleShow(true)}>Show Toast</Button>
			)}
			<Toast show={show} onClose={() => toggleShow(false)}>
				<Toast.Header>
					<strong className="mr-auto">React-Bootstrap</strong>
				</Toast.Header>
				<Toast.Body>{props.children}</Toast.Body>
			</Toast>
		</>
	);
}
