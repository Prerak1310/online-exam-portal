import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setCredentials } from "../slices/authSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";
const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const loginUser = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/login", {
				email,
				password,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				setEmail("");
				setPassword("");
				toast.success("Login Successful!");
				dispatch(setCredentials(data));
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					<form onSubmit={loginUser} className="space-y-4">
						<div>
							<label className="block text-gray-700">Email</label>
							<input
								type="text"
								placeholder="Enter email..."
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
						<p className="text-center text-sm text-gray-600">
							Don’t have an account?{" "}
							<Link to="/register" className="text-blue-600 hover:underline">
								Register
							</Link>
						</p>
					</form>

					<div className="mt-6">
						<Menu>
							<MenuButton className="bg-gray-200 w-full py-2 rounded hover:bg-gray-300">
								My account
							</MenuButton>
							<MenuItems
								anchor="bottom"
								className="mt-2 w-full bg-white border rounded shadow"
							>
								<MenuItem>
									<a className="block px-4 py-2 hover:bg-blue-100" href="/settings">
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a className="block px-4 py-2 hover:bg-blue-100" href="/support">
										Support
									</a>
								</MenuItem>
								<MenuItem>
									<a className="block px-4 py-2 hover:bg-blue-100" href="/license">
										License
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</div>
			</section>
		</>

	);
};

export default Login;
