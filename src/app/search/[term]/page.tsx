import process from "node:process";

import { redirect } from "next/navigation";
import React from "react";

import ResultList from "@/components/ResultList";
import { Product, SearchProps } from "@/utils/models";

export const revalidate = 300;

export default async function Search(props: SearchProps): Promise<React.JSX.Element> {
	if (!props.params.term) {
		redirect("/");
	}
	const response = await fetch(`${String(process.env.BASE_URL)}/api/search`, {
		method: "POST",
		body: JSON.stringify(props),
	});
	const data = (await response.json()) as Product[];
	return (
		<div>
			<ResultList term={props.params.term} results={data} />
		</div>
	);
}
