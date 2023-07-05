import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SeachLoader(): React.JSX.Element {
	return (
		<div className="flex px-2 md:px-5">
			<div className="w-36 md:w-64">
				{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
				{[...Array(5)].map((_, i) => (
					<div className="mt-2" key={i}>
						<div className="border rounded-r-lg md:rounded-lg p-5">
							<h1 className="font-bold mb-1 text-2xl">
								<Skeleton />
							</h1>
							<div className="flex flex-col">
								{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
								<Skeleton count={Math.floor(Math.random() * 5) + 1} />
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="px-5 md:p-10 md:pt-0 space-y-5 flex-1">
				{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
				{[...Array(1)].map((_, i) => (
					<div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
						{i !== 0 && <hr className="w-full col-span-full" />}
						<div className="md:col-span-2 lg:col-end-3 xl:col-span-4 py-5 ml-1">
							<div className="flex space-x-2 items-center divide-x-2">
								<h2 className="text-xl font-semibold">Loading results from Google Shopping...</h2>
							</div>
							<h3 className="font-extralight">Getting results for product</h3>
						</div>
						{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
						{[...Array(10)].map((_, i) => (
							<div
								key={i}
								className="border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out p-2">
								<Skeleton height={150} />
								<div className="flex flex-col space-y-2 mt-2">
									<Skeleton count={Math.floor(Math.random() * 3) + 1} />
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
