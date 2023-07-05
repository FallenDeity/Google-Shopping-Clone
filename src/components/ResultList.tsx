import Link from "next/link";
import React from "react";

import { Product } from "@/utils/models";

interface Props {
	term: string;
	results: Product[];
}

export default function ResultList({ term, results }: Props): React.JSX.Element {
	return (
		<div className="flex px-2 md:px-5">
			<div className="w-36 md:w-64">
				{results.map((result) => (
					<div key={result.job_id} className="space-y-2">
						{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
						{result.content.results.filters?.map(
							(filter): React.JSX.Element => (
								<div key={filter.name} className="border rounded-r-lg md:rounded-lg p-5">
									<p className="font-bold">{filter.name}</p>
									<div className="flex flex-col">
										{filter.values.map(
											(value): React.JSX.Element => (
												<Link
													key={value.url}
													prefetch={false}
													href={`https://www.google.com${value.url}`}>
													{value.value}
												</Link>
											)
										)}
									</div>
								</div>
							)
						)}
					</div>
				))}
			</div>
			<div className="px-5 md:p-10 md:pt-0 space-y-5 flex-1">
				{results.map(
					(result, i): React.JSX.Element => (
						<div
							key={result.job_id}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
							{i !== 0 && <hr className="w-full col-span-full" />}
							<div className="md:col-span-2 lg:col-end-3 xl:col-span-4 py-5 ml-1">
								<div className="flex space-x-2 items-center divide-x-2">
									<h1>Shop on Google</h1>
									<h2 className="text-xl font-semibold pl-2">Search Results for Page {i + 1}</h2>
								</div>
								<h3 className="font-extralight">Showing results for "{decodeURIComponent(term)}"</h3>
							</div>
							{result.content.results.organic.map(
								(result): React.JSX.Element => (
									<Link
										key={result.pos}
										className={`border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out p-2 ${
											// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
											result.url.includes("url?url=") && "italic"
										}`}
										href={
											result.url.includes("url?url=")
												? result.url.split("url?url=")[1]
												: result.url.split("?")[0]
										}>
										<div className="border-b p-5 flex-1">
											<p className="text-[#1B66D2]">{result.title}</p>
										</div>
										<div className="px-5 not-italic py-2">
											<p className="font-light">
												{result.price_str} {result.currency}
											</p>
											<p className="text-[#1B66D2] font-semibold truncate">
												{result.merchant.name}
											</p>
										</div>
									</Link>
								)
							)}
						</div>
					)
				)}
			</div>
		</div>
	);
}
