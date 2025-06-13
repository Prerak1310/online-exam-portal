import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
function Register() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const registerUser = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/register", {
				name,
				email,
				password,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				setEmail("");
				setName("");
				setPassword("");
				toast.success("Registration Success :D");
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
					<form onSubmit={registerUser} className="space-y-4">
						<div>
							<label className="block text-gray-700">Name</label>
							<input
								type="text"
								placeholder="Enter name..."
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
							/>
						</div>

						<div>
							<label className="block text-gray-700">Email</label>
							<input
								type="email"
								placeholder="Enter email..."
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
							/>
						</div>

						<div>
							<label className="block text-gray-700">Password</label>
							<input
								type="password"
								placeholder="Enter password..."
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
						>
							Submit
						</button>
					</form>
				</div>
			</section>

		</>
	);
}

export default Register;
