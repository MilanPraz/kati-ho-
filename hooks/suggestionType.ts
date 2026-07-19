export interface Suggestion {
  label: string;
  value: string;
  image_url: string | null;
  product_url: string;
  price: number | null;
  price_text: string | null;
  store: string;
}

export interface SuggestionsApiResponse {
  message: string;
  count: number;
  data: Suggestion[];
  cached: boolean;
}
