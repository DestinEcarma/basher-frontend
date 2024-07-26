// import axios from 'axios'
import { Topic as TopicProps, Reply as ReplyProps, Tables } from "../utils/sample-data";

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
const { Users, Topics, Replies } = Tables;

export function Login(email: string, password: string): boolean {
	const emailIndex = Users.findIndex((data) => data.email === email);

	if (emailIndex === -1 || Users[emailIndex].password !== password) {
		return false;
	}

	return true;
}

export function Signup(email: string, password: string): boolean {
	const emailIndex = Users.findIndex((data) => data.email === email);
	console.log(password);

	return emailIndex === -1;
}

export function Logout(): boolean {
	return true;
}

export function getTopic(id: string): TopicProps | undefined {
	return Topics.find((data) => data.id === id);
}

export function getReplies(id: string): ReplyProps[] | undefined {
	//returns replies to that topic/post @param id of post
	return Replies.filter((data) => data.replyTo === id);
}
