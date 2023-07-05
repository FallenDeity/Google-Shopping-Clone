import process from "node:process";

import { NextResponse } from "next/server";

import { PriceRange, Product, SearchProps } from "@/utils/models";

interface Filter {
	key: string;
	value: string | number;
}

export async function POST(request: Request): Promise<Product[] | NextResponse> {
	const params: SearchProps = (await request.json()) as SearchProps;
	if (!params.params.term) {
		return NextResponse.next(
			new Response("Missing search term", {
				status: 400,
			})
		);
	}
	const filter: Filter[] = [];
	Object.entries(params.searchParams).forEach(([key, value]) => {
		if (value) {
			if (key === "sortBy") {
				filter.push({
					key: "sort_by",
					value: value,
				});
			} else if (key === "minPrice") {
				filter.push({
					key: "min_price",
					value: Number(value.replace("$", "")),
				});
			} else if (key === "maxPrice") {
				const PriceRangeValues = Object.keys(PriceRange);
				const lastPriceRangeValue = PriceRangeValues[PriceRangeValues.length - 1];
				if (value === lastPriceRangeValue) {
					return;
				}
				filter.push({
					key: "max_price",
					value: Number(value.replace("$", "")),
				});
			}
		}
	});
	const token = `${String(process.env.OXYLAB_USERNAME)}:${String(process.env.OXYLAB_PASSWORD)}`;
	const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(token).toString("base64")}`,
		},
		cache: "no-store",
		body: JSON.stringify({
			source: "google_shopping_search",
			query: params.params.term,
			domain: "com",
			pages: Number(params.searchParams.page) || 1,
			parse: true,
			context: filter,
		}),
	});
	const products = (await response.json()) as { results: Product[] };
	return NextResponse.json(products.results);
}
