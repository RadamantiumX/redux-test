import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		// Tenemos que poner un TYPE al "event"
		event.preventDefault();
		const form = event.target;

		setResult(null);

		// Obtenemos los datos del FORMULARIO
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		// Validaciones
		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github }); // Le pasamos los argumentos a la ACTION
		setResult("ok");
		form.reset(); // Reset FORM
	};
	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create a new User</Title>
			<form onSubmit={handleSubmit}>
				<TextInput name="name" placeholder="Name here" />
				<TextInput name="email" placeholder="Mail here" />
				<TextInput name="github" placeholder="Git hub name here" />
				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Create User
					</Button>
					<span>
						{result === "ok" && (
							<Badge
								style={{
									background: "#056b31",
									color: "#21ed79",
									borderRadius: "15px",
								}}
								color="green"
							>
								Successfull Saved
							</Badge>
						)}
						{result === "ko" && (
							<Badge
								style={{
									background: "#e31029",
									color: "#eb6434",
									borderRadius: "15px",
								}}
							>
								Error to save
							</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
