import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@components/button";
import createPost from "@components/create-post";
import TopicRow from "@features/forum/components/topic-row";
import TopicSkeleton from "@features/forum/components/topic-skeleton";
import { GET_TOPICS, GetTopicsQuery, Tag } from "@features/forum/utils/defs";
import { CREATE_TOPIC } from "@graphql/mutations";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";

const ForumPage: React.FC = () => {
	const navigate = useNavigate();
	const [offset] = React.useState<number>(0);
	const [topics, setTopics] = React.useState<GetTopicsQuery["topic"]["get"]>([]);
	const [createTopic, { data: mutationData }] = useMutation(CREATE_TOPIC);
	const { register, handleSubmit } = useForm<{ query: string }>();
	const [searchParams, setSearchParams] = useSearchParams();

	const { loading: queryLoading, data: queryData } = useQuery<GetTopicsQuery>(GET_TOPICS, {
		variables: {
			offset: offset,
		},
	});

	useEffect(() => {
		const query = searchParams.get("query");

		console.log(query);
		if (query !== undefined) {
		}
	}, [searchParams]);

	useEffect(() => {
		if (queryData === undefined) return;

		setTopics((prev) => {
			const existingIds = new Set(prev.map((topic) => topic.id));
			const newTopics = queryData.topic.get.filter((topic) => !existingIds.has(topic.id));
			return [...prev, ...newTopics];
		});
	}, [queryData]);

	useEffect(() => {
		if (mutationData === undefined) return;

		navigate(`/topic/${mutationData.topic.create}`);
	}, [mutationData, navigate]);

	const onSearch: SubmitHandler<{ query: string }> = ({ query }) => {
		if (query.length < 3) return;

		setSearchParams({ query });
	};

	const onClickCreateTopic = () => {
		createPost.open({
			mode: "create",
			onSubmit: (content: string, title: string, tags: Tag[]) => {
				createTopic({
					variables: {
						input: {
							title,
							tags,
							content,
						},
					},
				});

				createPost.close();
			},
		});
	};

	return (
		<div className="mx-auto flex h-full w-full flex-col gap-8 pb-8 md:max-w-3xl lg:max-w-7xl">
			<div className="flex w-full justify-between gap-8 mt-4 rounded-lg bg-white px-8 py-4 shadow-lg">
				<form onSubmit={handleSubmit(onSearch)} className="flex flex-grow items-center gap-2">
					<Button type="submit" variant="ghost" size="sm" className="group">
						<FaMagnifyingGlass className="text-gray-400 transition-colors group-hover:text-black" />
					</Button>
					<input placeholder="Search" {...register("query")} className="flex-grow" />
				</form>
				<Button size="sm" onClick={onClickCreateTopic} className="flex items-center gap-2 font-normal">
					<FaPlus />
					New Topic
				</Button>
			</div>
			<div className="flex flex-grow overflow-hidden rounded-lg bg-white p-8 shadow-lg">
				<div className="felx flex-grow overflow-scroll">
					<table className="w-full flex-grow table-auto">
						<thead>
							<tr>
								<th className="w-full text-left">Topic</th>
								<th className="px-4 font-normal text-gray-500">Replies</th>
								<th className="px-4 font-normal text-gray-500">Likes</th>
								<th className="px-4 font-normal text-gray-500">Activity</th>
							</tr>
						</thead>
						<tbody>
							{!queryLoading && topics.map((topic) => <TopicRow key={topic.id} {...topic} />)}
							{queryLoading && <TopicSkeleton />}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ForumPage;
