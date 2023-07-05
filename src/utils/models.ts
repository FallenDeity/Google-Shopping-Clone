export enum SortBy {
	r = "Default",
	rv = "Review",
	p = "By Price: Low to High",
	pd = "By Price: High to Low",
}

export enum PriceRange {
	$25 = "$25",
	$50 = "$50",
	$100 = "$100",
	$200 = "$200",
	$500 = "$500",
	$1000 = "$1000+",
}

export interface SearchProps {
	params: {
		term: string;
	};
	searchParams: {
		page?: string;
		sortBy?: string;
		minPrice?: string;
		maxPrice?: string;
	};
}

export interface Filter {
	name: string;
	values: { url: string; value: string }[];
}

export interface Organic {
	pos: number;
	url: string;
	type: string;
	price: number;
	title: string;
	currency: string;
	merchant: { url: string; name: string };
	price_str: string;
	product_id: string;
	pos_overall: number;
}

export interface Results {
	paid: never[];
	filters: Filter[];
	organic: Organic[];
}

export interface Content {
	url: string;
	page: number;
	results: Results;
	search_information: { query: string; showing_results_for: string };
	last_visible_page: number;
	parse_status_code: number;
}

export interface Product {
	content: Content;
	updated_at: string;
	created_at: string;
	page: number;
	url: string;
	job_id: string;
	status_code: number;
	parser_type: string;
}

export interface ProductImages {
	full_size: string[];
	images: string[];
}

export interface Variants {
	type: string;
	items: { value: string; available: boolean; selected: boolean; product_id: string }[];
}

export interface RelatedProduct {
	url: string;
	price: number;
	title: string;
	rating: number;
	currency: string;
	reviews_count: number;
}

export interface ProductReview {
	rating: number;
	top_review: {
		text: string;
		title: string;
		rating: number;
		author: string;
		source: string;
	};
	rating_stars: number;
	reviews_count: number;
	review_by_stars: Record<string, { url: string; reviews_count: number }>;
}

export interface ProductPricing {
	online: {
		price: number;
		seller: string;
		details: string;
		currency: string;
		condition: string;
		price_tax: number;
		price_total: number;
		seller_link: string;
		price_shipping: number;
	}[];
}

export interface ProductContent {
	url: string;
	title: string;
	images: ProductImages;
	variants: Variants[];
	highlights: string[];
	description: string;
	related_items: { items: RelatedProduct[]; title: string }[];
	specifications: { items: { title: string; value: string }[]; section_title: string }[];
	reviews: ProductReview;
	pricing: ProductPricing;
	parse_status_code: number;
}

export interface ProductData {
	content: ProductContent;
	updated_at: string;
	created_at: string;
	page: number;
	url: string;
	job_id: string;
	status_code: number;
	parser_type: string;
}
