export type ListResponse<T> = {
  data: T[];
  meta: Record<string, any>;
};

export function listResponse<T>(list: T[], metaData?: Record<string, any>) {
  return {
    data: list,
    meta: {
      totalItems: list.length,
      ...metaData,
    },
  };
}
