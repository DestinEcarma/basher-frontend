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
	Users: User[];
	Topics: Topic[];
	Replies: Reply[];
}

export const Tables: TablesType = {
	Users: [
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

	Topics: [
		{
			id: "1",
			author: "1",
			title: "I was molested by sir godwin...",

			content:
				"Est asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas? Est asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas?",
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

	Replies: [
		{
			id: "1",
			author: "1",
			content:
				"Et galisum voluptatem est labore nesciunt quo quasi porro qui rerum deleniti est saepe minima et similique tenetur. Ab rerum tempore At quaerat delectus ea dolorem voluptas ut quidem modi id esse sunt cum ipsa alias. Ab sunt veritatis aut itaque debitis sit fugiat eius ad repellat nihil. Et veniam neque vel sunt recusandae sed tempora amet hic dolore eaque.",
			replyTo: "1",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		{
			id: "2",
			author: "2",
			content: "YAH I HATE SIR MONERATE",
			replyTo: "1",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		{
			id: "3",
			author: "3",
			content: "Haha, I love the world too...",
			replyTo: "2",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
	],
};
