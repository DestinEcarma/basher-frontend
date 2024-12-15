import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@components/button";
import createPost from "@components/create-post";
import TopicRow from "@features/forum/components/topic-row";
import TopicSkeleton from "@features/forum/components/topic-skeleton";
import { GET_TOPICS, GetTopicsQuery, Tag } from "@features/forum/utils/defs";
import { CREATE_TOPIC } from "@graphql/mutations";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ForumPage: React.FC = () => {
	const navigate = useNavigate();
	const [offset] = React.useState<number>(0);
	const [topics, setTopics] = React.useState<GetTopicsQuery["topic"]["get"]>([]);
	const [createTopic, { data: mutationData }] = useMutation(CREATE_TOPIC);

	const { loading: queryLoading, data: queryData } = useQuery<GetTopicsQuery>(GET_TOPICS, {
		variables: {
			offset: offset,
		},
	});

	useEffect(() => {
		if (queryData === undefined) return;

		setTopics((prev) => [...prev, ...queryData.topic.get]);
	}, [queryData]);

	useEffect(() => {
		if (mutationData === undefined) return;

		navigate(`/topic/${mutationData.topic.create}`);
	}, [mutationData, navigate]);

	const onClickCreateTopic = () => {
		createPost.open({
			mode: "create",
			onSubmit: (title: string, tags: Tag[], content: string) => {
				createTopic({
					variables: {
						input: {
							title,
							tags,
							content,
						},
					},
				});
			},
		});
	};

	return (
		<div className="mx-auto flex h-full w-full flex-col gap-8 pb-8 md:max-w-3xl lg:max-w-7xl">
			<div className="flex w-full justify-between gap-8 rounded-lg bg-white px-8 py-4 shadow-lg">
				<form className="flex flex-grow items-center gap-2">
					<Button variant="ghost" size="sm" className="group">
						<FaMagnifyingGlass className="text-gray-400 transition-colors group-hover:text-black" />
					</Button>
					<input placeholder="Search" className="flex-grow" />
				</form>
				<Button size="sm" onClick={onClickCreateTopic} className="flex items-center gap-2 font-normal">
					<FaPlus />
					New Topic
				</Button>
			</div>
			<div className="h-full w-full rounded-lg bg-white p-8 shadow-lg">
				<table className="w-full table-auto">
					<thead>
						<tr>
							<th className="w-full text-left">Topic</th>
							<th className="px-4 font-normal text-gray-500">Replies</th>
							<th className="px-4 font-normal text-gray-500">Likes</th>
							<th className="px-4 font-normal text-gray-500">Activity</th>
						</tr>
					</thead>
					{queryLoading && <TopicSkeleton />}
					{!queryLoading && topics.map((topic) => <TopicRow key={topic.id} {...topic} />)}
				</table>
			</div>
		</div>
	);
};

export default ForumPage;
