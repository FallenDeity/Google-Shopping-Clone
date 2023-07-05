import process from "node:process";

import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";
import React from "react";

import { ProductData } from "@/utils/models";

interface ProductProps {
	params: {
		id: string;
	};
}

export const revalidate = 300;

export default async function Product({ params: { id } }: ProductProps): Promise<React.JSX.Element> {
	const response = await fetch(`${String(process.env.BASE_URL)}/api/shopping/product/${id}`);
	const data = (await response.json()) as ProductData;
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!data.content.pricing) {
		return notFound();
	}
	return (
		<div className="p-5 md:p-12 pt-0">
			<h1 className="text-xl md:text-2xl pb-1">{data.content.title}</h1>
			{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
			{data.content.reviews && (
				<div className="flex space-x-1">
					{Array.from({ length: Math.round(data.content.reviews.rating) }, (_, i) => (
						<StarIconFilled key={i} className="h-5 w-5 text-yellow-500" />
					))}
					{Array.from({ length: 5 - Math.round(data.content.reviews.rating) }, (_, i) => (
						<StarIcon key={i} className="h-5 w-5 text-gray-400" />
					))}
					<p className="text-gray-400">{data.content.reviews.rating}</p>
				</div>
			)}
			<section className="flex flex-col lg:flex-row md:mt-0 mt-5">
				<div className="md:p-10 md:pl-0 mx-auto">
					<div className="flex gap-4">
						<img
							className="w-60 h-60 p-5 border rounded-md object-contain md:h-80 md:w-80"
							/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
							src={data.content.images?.full_size[0]}
							alt={data.content.title}
						/>
						<div className="flex flex-col justify-between h-60 md:h-80 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
							{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
							{data.content.images?.full_size.slice(1, 3).map((image) => (
								<img
									key={image}
									className="w-[9.5rem] h-[9.5rem] object-contain border rounded-md"
									src={image}
									alt={data.content.title}
								/>
							))}
						</div>
					</div>
					<div className="flex space-x-6 overflow-x-auto py-2 md:w-[30rem] scrollbar-thin scrollbar-corner-gray-300">
						{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
						{data.content.images?.full_size.slice(3).map((image) => (
							<img
								key={image}
								className="w-20 h-20 object-contain"
								src={image}
								alt={data.content.title}
							/>
						))}
					</div>
				</div>
				<div className="pt-10">
					<div>
						{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
						{data.content.pricing?.online[0].details && (
							<>
								<h3 className="font-bold text-2xl">Product Details</h3>
								<p className="text-lg">
									{data.content.pricing.online[0].price_total}{" "}
									<span className="text-gray-400">{data.content.pricing.online[0].currency}</span>
								</p>
								<div className="flex space-x-4">
									<p className="text-sm text-gray-600">
										({data.content.pricing.online[0].price}{" "}
										{data.content.pricing.online[0].currency}) +{" "}
										{data.content.pricing.online[0].price_tax}{" "}
										{data.content.pricing.online[0].currency} tax)
									</p>
									{data.content.pricing.online.length > 1 && (
										<p className="text-sm text-blue-600">
											+ {data.content.pricing.online.length - 1} more offers
										</p>
									)}
								</div>
								<p className="text-sm text-gray-600 mt-5">{data.content.pricing.online[0].details}</p>
							</>
						)}
						<hr className="my-5" />
						<p>{data.content.description}</p>
						{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
						{data.content.highlights && (
							<>
								<div className="mt-5 space-y-2">
									<h3 className="font-bold text-2xl">Product Highlights</h3>
									<hr />
									<ul className="list-disc list-inside space-y-2">
										{data.content.highlights.map((highlight) => (
											<li key={highlight}>{highlight}</li>
										))}
									</ul>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
			<section>
				<hr className="my-10" />
				{
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					data.content.reviews ? (
						<>
							<h3 className="font-bold text-2xl">Reviews ({data.content.reviews.rating})</h3>
							<h4 className="text-lg italic">Top Review</h4>
							{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
							{data.content.reviews.top_review && (
								<div className="border p-5 rounded-lg mt-2">
									<div className="flex space-x-1">
										<p className="font-bold capitalize">
											{data.content.reviews.top_review.author} says:
										</p>
										<h5>{data.content.reviews.top_review.title}</h5>
									</div>
									<div className="flex space-x-1 mb-2">
										{Array.from(
											{ length: Math.round(data.content.reviews.top_review.rating) },
											(_, i) => (
												<StarIconFilled key={i} className="h-5 w-5 text-yellow-500" />
											)
										)}
										{Array.from(
											{ length: 5 - Math.round(data.content.reviews.top_review.rating) },
											(_, i) => (
												<StarIcon key={i} className="h-5 w-5 text-gray-400" />
											)
										)}
									</div>
									<p>{data.content.reviews.top_review.text}</p>
								</div>
							)}
						</>
					) : (
						<>
							<div>
								<h3 className="font-bold text-2xl">Reviews</h3>
								<p className="text-lg italic">No reviews yet</p>
							</div>
						</>
					)
				}
			</section>
			{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
			{data.content.specifications && (
				<section>
					<hr className="my-10" />
					<h3 className="font-bold text-2xl">Specifications</h3>
					<div className="grid grid-cols-2 gap-4">
						{data.content.specifications.map((spec) => (
							<div key={spec.section_title} className="space-y-2">
								<h4 className="font-bold my-2 text-lg">{spec.section_title}</h4>
								{spec.items.map((item) => (
									<div key={item.title} className="text-sm">
										<p className="font-bold">{item.title}</p>
										<p>{item.value}</p>
									</div>
								))}
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
