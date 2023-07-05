"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SearchSelect, SearchSelectItem, Select, SelectItem } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Avatar from "react-avatar";

import SearchButton from "@/components/SearchButton";
import { PriceRange, SortBy } from "@/utils/models";

export default function Header(): React.JSX.Element {
	const router = useRouter();
	const [page, setPage] = React.useState<string>("1");
	const [sortBy, setSortBy] = React.useState<string>();
	const [minPrice, setMinPrice] = React.useState<string>();
	const [maxPrice, setMaxPrice] = React.useState<string>();
	return (
		<header className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 px-2 pt-10 pb-5 md:p-10 md:pb-5">
			<Link href="/">
				<Image
					src="https://links.papareact.com/208"
					width={150}
					height={150}
					alt="Logo"
					className="object-contain mr-10 mb-2 md:mb-0"
				/>
			</Link>
			<div className="w-full md:max-w-2xl">
				<form
					action={(formData): void => {
						const query = formData.get("searchQuery");
						if (!query) return;
						const params = new URLSearchParams();
						if (page) params.set("page", page.toString());
						if (sortBy) params.set("sortBy", sortBy.toString());
						if (minPrice) params.set("minPrice", minPrice.toString());
						if (maxPrice) params.set("maxPrice", maxPrice.toString());
						router.push(`/search/${query.toString()}?${params.toString()}`);
					}}>
					<div className="flex items-center gap-2 w-full px-4">
						<div className="flex flex-1 items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-6 py-4">
							<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
							<input
								type="text"
								name="searchQuery"
								id="searchQuery"
								placeholder="Search..."
								className="outline-none flex-1"
							/>
						</div>
						<SearchButton />
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 max-w-lg md:max-w-none mx-auto items-center">
						<SearchSelect
							className="min-w-4"
							placeholder="# of results"
							onChange={(value): void => setPage(String(value))}>
							{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
							{[...Array(100)].map((_, index) => (
								<SearchSelectItem key={index} value={(index + 1).toString()}>
									{(index + 1).toString()} results
								</SearchSelectItem>
							))}
						</SearchSelect>
						<Select
							className="min-w-4"
							placeholder="Sort by"
							onChange={(value): void => setSortBy(String(value))}>
							{Object.entries(SortBy).map(([key, value]) => (
								<SelectItem key={key} value={key}>
									{value}
								</SelectItem>
							))}
						</Select>
						<SearchSelect
							className="min-w-4"
							placeholder="Min price..."
							onChange={(value): void => setMinPrice(String(value))}>
							{Object.entries(PriceRange).map(([key, value]) => (
								<SearchSelectItem key={key} value={key}>
									{value}
								</SearchSelectItem>
							))}
						</SearchSelect>
						<SearchSelect
							className="min-w-4"
							placeholder="Max price..."
							onChange={(value): void => setMaxPrice(String(value))}>
							{Object.entries(PriceRange).map(([key, value]) => (
								<SearchSelectItem key={key} value={key}>
									{value}
								</SearchSelectItem>
							))}
						</SearchSelect>
					</div>
				</form>
			</div>
			<div className="hidden lg:flex flex-1 justify-end">
				<Avatar name="John Doe" size="50" round />
			</div>
		</header>
	);
}
