import Link from "next/link";
import React from "react";

const SEARCHES = [
	{
		id: 1,
		term: "Montiors over $100",
		url: "/search/monitors?sort_by=r&min_price=100",
		color: "bg-blue-500",
	},
	{
		id: 2,
		term: "Laptops under $500",
		url: "/search/laptops?sort_by=r&max_price=500",
		color: "bg-green-500",
	},
	{
		id: 3,
		term: "Apple I Phone 14",
		url: "/search/Apple I Phone 14",
		color: "bg-yellow-500",
	},
	{
		id: 4,
		term: "Sunglasses",
		url: "/search/Sunglasses",
		color: "bg-red-500",
	},
	{
		id: 5,
		term: "Headphones JBL",
		url: "/search/Headphones JBL",
		color: "bg-purple-500",
	},
	{
		id: 6,
		term: "Zebronics Keyboard RGB",
		url: "/search/Zebronics Keyboard RGB",
		color: "bg-pink-500",
	},
];

export default function Home(): React.JSX.Element {
	return (
		<div className="p-10 pt-0 text-center md:text-left">
			<h1 className="text-3xl font-extralight mb-5">Welcome to Google Shopping</h1>
			<h2 className="mb-5">Get started by searching for a product or browsing through the search bar above.</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center gap-5 mt-5">
				{SEARCHES.map((search) => (
					<Link
						prefetch={false}
						key={search.id}
						href={search.url}
						className={`${search.color} hover:opacity-50 h-36 w-full text-white font-bold py-2 px-4 rounded shadow-md`}>
						{search.term}
					</Link>
				))}
			</div>
		</div>
	);
}
