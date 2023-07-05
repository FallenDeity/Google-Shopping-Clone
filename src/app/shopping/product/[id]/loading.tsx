import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ProductLoader(): React.JSX.Element {
	return (
		<div className="p-5 md:p-12 pt-0">
			<Skeleton />
			<Skeleton width={200} />
			<div className="flex flex-col justify-center items-center md:items-start md:justify-start md:flex-row md:p-10 pl-0 m-5 ml-0">
				<Skeleton width={400} height={250} />
				<div className="pl-0 md:pl-5 mt-10 md:mt-0">
					<Skeleton width={300} />
					<Skeleton width={250} />
					<Skeleton width={200} />
					<br />
					<Skeleton width={600} height={100} />
					<br />
					<Skeleton count={3} />
				</div>
			</div>
			<Skeleton className="w-full h-60 p-5" />
		</div>
	);
}
