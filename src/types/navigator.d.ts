interface Navigator {
  userAgentData?: {
    brands?: { brand: string; version: string }[];
    mobile?: boolean;
    getHighEntropyValues?: (hints: string[]) => Promise<Record<string, any>>;
  };
}
