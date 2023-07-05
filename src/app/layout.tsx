import "@/styles/globals.css";

import React from "react";

import Header from "@/components/Header";

export const metadata = {
	title: "Google Shopping",
	description: "A Google Shopping clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang="en">
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
