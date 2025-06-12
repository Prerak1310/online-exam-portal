import React, { Suspense } from "react";
import { Routes, BrowserRouter, Route, redirect } from "react-router-dom";
import { lazy } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import LayoutLoader from "./components/layouts/Loading.jsx";
import NotFound from "./pages/NotFound.jsx";

// lazy loading of pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
//const ProtectedRoutes = lazy(() => import("./utils/ProtectedRoutes.jsx"));

// Admin Pages
const ExamCreate = lazy(() => import("./pages/admin/ExamCreate.jsx"));
const ExamList = lazy(() => import("./pages/admin/ExamList.jsx"));
const AddQuestions = lazy(() => import("./pages/admin/AddQuestions.jsx"));
const PreviewExam = lazy(() => import("./pages/admin/PreviewExam.jsx"));


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
const App = () => {
	return (
		<BrowserRouter>
			<Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
			{/* loading screen in LayoutLoader */}
			<Suspense fallback={<LayoutLoader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Admin Routes */}
					<Route path="/examcreate" element={<ExamCreate />} />
					<Route path="/exams" element={<ExamList />} />
					<Route path="/addquestions/:examId" element={<AddQuestions />} />
					<Route path="/previewexam/:examId" element={<PreviewExam />} />

					{/* Not Found Route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
