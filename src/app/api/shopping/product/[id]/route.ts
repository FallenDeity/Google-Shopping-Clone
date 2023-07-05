import process from "node:process";

import { Response } from "next/dist/compiled/@edge-runtime/primitives";
import { NextResponse } from "next/server";

import { ProductData } from "@/utils/models";

interface ProductProps {
	params: {
		id: string;
	};
}

export async function GET(_: Request, { params: { id } }: ProductProps): Promise<ProductData | NextResponse> {
	if (!id) {
		return NextResponse.next(new Response("Product not found", { status: 404 }));
	}
	// sleep for 5 seconds to wait for the product to be indexed
	await new Promise((resolve) => setTimeout(resolve, 5000));
	const token = `${String(process.env.OXYLAB_USERNAME)}:${String(process.env.OXYLAB_PASSWORD)}`;
	const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(token).toString("base64")}`,
		},
		cache: "no-store",
		body: JSON.stringify({
			source: "google_shopping_product",
			query: id,
			domain: "com",
			parse: true,
		}),
	});
	const data = (await response.json()) as { results: ProductData[] };
	if (!data.results.length) {
		return NextResponse.next(new Response("Product not found", { status: 404 }));
	}
	return NextResponse.json(data.results[0]);
}
