import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "@components/auth";
import { Button } from "@components/button";
import createPost from "@components/create-post";
import { Logo } from "@components/logo";
import TopicRow from "@features/forum/components/topic-row";
import TopicSkeleton from "@features/forum/components/topic-skeleton";
import {
	GET_TOPICS,
	GetTopicsQuery,
	SEARCH_TOPICS,
	SearchTopicsQuery,
	SearchTopicInput,
	CREATE_TOPIC,
	GetTopicQuery,
	GET_TOPIC,
} from "@features/forum/utils/defs";
import { useLogout } from "@hooks/use-logout";
import { INTERSECTION_OPTIONS } from "@utils/defs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";

const ForumPage: React.FC = () => {
	const navigate = useNavigate();

	const auth = useContext(AuthContext);

	const { logout } = useLogout();

	const lastTopicRef = useRef<HTMLTableRowElement>(null);

	const [searchParams, setSearchParams] = useSearchParams();

	const [offset, setOffset] = useState<number>(0);
	const [searchInput, setSearchInput] = useState<SearchTopicInput>({
		offset: 0,
		query: "",
		tags: "",
	});
	const [topics, setTopics] = useState<GetTopicsQuery["topic"]["get"]>([]);

	const { register, setValue, handleSubmit } = useForm<{ query: string }>();

	const [createTopic, { data: mutationData }] = useMutation(CREATE_TOPIC);

	const [getLatestTopic, { called: calledGetLatestTopic, loading: loadingGetLastestTopic }] =
		useLazyQuery<GetTopicQuery>(GET_TOPIC);

	const { loading: retrieveLoading, data: retrieveData } = useQuery<GetTopicsQuery>(GET_TOPICS, {
		variables: {
			offset: offset,
		},
		skip: (searchParams.get("query")?.length ?? 0) > 2,
	});

	const {
		loading: searchLoading,
		data: searchData,
		fetchMore: searchFetchMore,
	} = useQuery<SearchTopicsQuery>(SEARCH_TOPICS, {
		variables: {
			input: searchInput,
		},
		skip: (searchParams.get("query")?.length ?? 0) < 3,
	});

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				if ((searchParams.get("query") ?? "").length < 3) {
					setOffset(topics.length);
				} else {
					setSearchInput((prev) => ({ ...prev, offset: topics.length }));
				}
			}
		}, INTERSECTION_OPTIONS);

		if (lastTopicRef.current) {
			observer.observe(lastTopicRef.current);
		}

		return () => observer.disconnect();
	}, [lastTopicRef, searchFetchMore, searchParams, setOffset, topics]);

	useEffect(() => {
		const query = searchParams.get("query");

		setValue("query", query ?? "");

		if (query && query.length > 2) {
			setOffset(0);
			setTopics([]);
			setSearchInput({
				offset: 0,
				query: query
					.trim()
					.split(" ")
					.filter((tag) => tag[0] !== "#")
					.join(" "),
				tags: query
					.trim()
					.split(" ")
					.filter((tag) => tag[0] === "#")
					.join(" "),
			});
		}
	}, [offset, setValue, searchParams, searchFetchMore]);

	useEffect(() => {
		const eventSource = new EventSource("/sse/topic");

		eventSource.onmessage = async (event) => {
			if ((searchParams.get("query")?.length ?? 0) > 2) return;

			const topicId = (JSON.parse(event.data) as { id: string }).id;

			const { data } = await getLatestTopic({
				variables: {
					id: topicId,
				},
			});

			if (data?.topic.getById) {
				setTopics((prev) => {
					const existingIds = new Set(prev.map((topic) => topic.id));
					if (!existingIds.has(data.topic.getById.id)) {
						return [data.topic.getById, ...prev];
					} else {
						return prev;
					}
				});
			}
		};

		return () => eventSource.close();
	}, [searchParams, setTopics, getLatestTopic]);

	useEffect(() => {
		if (retrieveData === undefined) return;

		setTopics((prev) => {
			const existingIds = new Set(prev.map((topic) => topic.id));
			const newTopics = retrieveData.topic.get.filter((topic) => !existingIds.has(topic.id));
			return [...prev, ...newTopics].sort(
				(a, b) => new Date(b.activity).getTime() - new Date(a.activity).getTime(),
			);
		});
	}, [retrieveData]);

	useEffect(() => {
		if (searchData === undefined) return;

		setTopics((prev) => {
			const existingIds = new Set(prev.map((topic) => topic.id));
			const newTopics = searchData.topic.search.filter((topic) => !existingIds.has(topic.id));
			return [...prev, ...newTopics];
		});
	}, [searchData]);

	useEffect(() => {
		if (mutationData === undefined) return;

		navigate(`/topic/${mutationData.topic.create}`);
	}, [mutationData, navigate]);

	const onSearch: SubmitHandler<{ query: string }> = ({ query }) => {
		setSearchParams({ query });
	};

	const onClickCreateTopic = () => {
		createPost.open({
			mode: "create",
			onSubmit: (content, title, tags) => {
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
			<div className="flex w-full justify-between gap-8 rounded-b-lg bg-white px-4 py-2 shadow-lg">
				<div className="flex flex-grow gap-4">
					<Logo />
					<form onSubmit={handleSubmit(onSearch)} className="flex flex-grow items-center gap-2">
						<Button type="submit" variant="ghost" size="sm" className="group">
							<FaMagnifyingGlass className="text-gray-400 transition-colors group-hover:text-black" />
						</Button>
						<input placeholder="Search" {...register("query")} className="flex-grow" />
					</form>
				</div>
				<div className="flex gap-4">
					{auth ? (
						<>
							<Button size="sm" onClick={onClickCreateTopic} className="flex items-center gap-2">
								<FaPlus />
								New Topic
							</Button>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => logout()}
								className="flex items-center gap-2"
							>
								<FaSignOutAlt />
								Logout
							</Button>
						</>
					) : (
						<>
							<Button size="sm" onClick={() => navigate("/login")} className="flex items-center gap-2">
								Login
							</Button>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => navigate("/sign-up")}
								className="flex items-center gap-2"
							>
								Sign Up
							</Button>
						</>
					)}
				</div>
			</div>
			<div className="flex flex-grow overflow-hidden rounded-lg bg-white p-8 shadow-lg">
				<div className="felx flex-grow overflow-scroll">
					<table className="w-full flex-grow table-auto">
						<thead>
							<tr>
								<th className="w-full text-left">Topic</th>
								<th className="font px-4 text-gray-500">Replies</th>
								<th className="font px-4 text-gray-500">Likes</th>
								<th className="font px-4 text-gray-500">Activity</th>
							</tr>
						</thead>
						<tbody>
							{calledGetLatestTopic && loadingGetLastestTopic && <TopicSkeleton />}
							{topics.map((topic, index) => (
								<TopicRow
									ref={index === topics.length - 1 ? lastTopicRef : null}
									key={topic.id}
									{...topic}
								/>
							))}
							{(retrieveLoading || searchLoading) &&
								new Array(20).fill(null).map((_, key) => <TopicSkeleton key={key} />)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ForumPage;
