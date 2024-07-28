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

export interface SubReply {
	author: string;
	content: string;
	timestamp: Date;
}

export interface TablesType {
	Users: User[];
	Topics: Topic[];
	Replies: Reply[];
	SubReply: {
		id: string;
		replies: SubReply[];
	}[];
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
				"## I hate...\nEst asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas? Est asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas.\n\n[Facebook](https:facebook.com)\n\n - Meow\n<ol><li>nga</li><li>grrr</li></ol>",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		{
			id: "2",
			author: "2",
			title: "Hello World",
			content: "## Lorem Ipsum\nIstaka n word\n\n```This is code```",
			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		{
			id: "3",
			author: "3",
			title: "Hello World",
			content: `\n# My Markdown Document\nHere's a paragraph in Markdown.\n<div class="custom-html">\n<h2>This is an HTML heading inside Markdown</h2>\n<p>This is a paragraph with custom styling.</p>\n</div>\n\n- Markdown list item 1\n\n- Markdown list item 2\n`,

			time: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		{
			id: "4",
			author: "4",
			title: "Hello World",
			content: `
## My Content

<p style="color: red;">This text should not be red.</p>

<p><strong>Strong text with <em>emphasis</em> and a <span class="custom-class">custom class</span>.</strong></p>

<table>
  <thead style="background-color: blue;">
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
    <tr>
      <td>Data 3</td>
      <td>Data 4</td>
    </tr>
  </tbody>
</table>
`,

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
			content: "## YAH I HATE SIR MONERATE",
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

	SubReply: [
		{
			id: "1",
			replies: [
				{
					author: "1",
					content:
						"Lorem ipsum dolor sit amet. Et omnis velit ut quam sapiente quo maiores soluta ut suscipit quod eos sint perspiciatis sit exercitationem error. Qui ducimus porro nam quod voluptatem qui velit eius est voluptates officiis non voluptatem esse ut veniam delectus non magni debitis.",
					timestamp: new Date(),
				},
				{
					author: "2",
					content:
						"Aut omnis veritatis eos aliquid aliquid eum beatae assumenda rem consequuntur deserunt est quia nobis est galisum vitae! Est culpa magnam sit vitae facere qui unde recusandae sed voluptatem veritatis qui perspiciatis corporis. Id itaque dolores nam dignissimos delectus ad dolore praesentium et quia deleniti aut dolor minima in illo autem et nulla Quis.",
					timestamp: new Date(),
				},
				{
					author: "3",
					content:
						"Aut omnis veritatis eos aliquid aliquid eum beatae assumenda rem consequuntur deserunt est quia nobis est galisum vitae! Est culpa magnam sit vitae facere qui unde recusandae sed voluptatem veritatis qui perspiciatis corporis. Id itaque dolores nam dignissimos delectus ad dolore praesentium et quia deleniti aut dolor minima in illo autem et nulla Quis.",
					timestamp: new Date(),
				},
				{
					author: "4",
					content:
						"Aut omnis veritatis eos aliquid aliquid eum beatae assumenda rem consequuntur deserunt est quia nobis est galisum vitae! Est culpa magnam sit vitae facere qui unde recusandae sed voluptatem veritatis qui perspiciatis corporis. Id itaque dolores nam dignissimos delectus ad dolore praesentium et quia deleniti aut dolor minima in illo autem et nulla Quis.",
					timestamp: new Date(),
				},
			],
		},
	],
};
