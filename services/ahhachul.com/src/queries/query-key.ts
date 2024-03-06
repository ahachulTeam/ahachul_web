function getQueryKeys(type: string[]) {
  return {
    all: type,
    lists() {
      return [...this.all, 'list'] as const;
    },
    list(filters: Record<string, unknown>) {
      return [...this.lists(), filters] as const;
    },
    details() {
      return [...this.all, 'detail'] as const;
    },
    detail(id: number | string) {
      return [...this.details(), id] as const;
    },
  };
}

export { getQueryKeys };
