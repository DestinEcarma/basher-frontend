// import axios from 'axios'
import sampleData from "../utils/sampleData";

// const USER_PATH = '/user';

// const API = axios.create({
// 	withCredentials: true,
// 	baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? "http://localhost:5173/api" : "/api"
// })

// export async function Login(username: string, password: string) {
// 	return API.post(`${USER_PATH}/login`, { username, password });
// }

// export async function Signup(username: string, password: string) {
// 	return API.post(`${USER_PATH}/signup`, { username, password });
// }

// export async function Logout() {
// 	return API.delete(`${USER_PATH}/delete`);
// }

/* TEMPORARY FUNCTIONS */

export function Login(email: string, password: string) {
	const emailIndex = sampleData.findIndex((data) => data.email === email);

	if (emailIndex === -1 || sampleData[emailIndex].password !== password) {
		return false;
	}

	return true;
}

export function Signup(email: string, password: string) {
	const emailIndex = sampleData.findIndex((data) => data.email === email);
	console.log(password);

	return emailIndex === -1;
}

export function Logout() {
	return true;
}
