"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SearchButton(): React.JSX.Element {
	const { pending }: { pending: boolean } = useFormStatus();
	const searchButtonRef = React.useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (searchButtonRef.current) {
			searchButtonRef.current.disabled = pending;
		}
	}, [pending]);
	return (
		<button
			ref={searchButtonRef}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
			{pending ? "Searching..." : <MagnifyingGlassIcon className="h-5 w-5" />}
		</button>
	);
}
