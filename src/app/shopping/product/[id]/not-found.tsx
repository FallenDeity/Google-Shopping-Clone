import React from "react";

export default function NotFound(): React.JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center h-screen space-y-5">
			<h1 className="text-9xl font-bold">404</h1>
			<h2 className="text-2xl font-semibold">Page not found</h2>
			<p className="text-xl font-light">The page you are looking for does not exist.</p>
		</div>
	);
}
