export interface User {
	id: string;
	email: string;
	password: string;
}

export interface Topic {
	id: string;
	author: string;
	title: string;
	tags?: string[];
	content: string;
	time: {
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface Reply {
	id: string;
	author: string;
	content: string;
	replyTo: string;
	time: {
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface TablesType {
	users: User[];
	Topic: Topic[];
	Replies: Reply[];
}

export const Tables: TablesType = {
	users: [
		{
			id: "1",
			email: "destin_ecarma@gmail.com",
			password: "destin_ecarma",
		},
		{
			id: "2",
			email: "john_doe@gmail.com",
			password: "john_doe",
		},
		{
			id: "3",
			email: "jane_doe@gmail.com",
			password: "jane_doe",
		},
	],

	Topic: [
		{
			id: "1",
			author: "1",
			title: "Hello World",

			content: "Lorem Ipsum",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		{
			id: "2",
			author: "2",
			title: "Hello World",
			content: "Lorem Ipsum",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
	],

	Replies: [],
};

export const SampleData: User[] = [
	{
		id: '1',
		email: "sample@gmail.com",
		password: "123",
	},
	{
		id: '2',
		email: "admin@gmail.com",
		password: "123",
	},
];
