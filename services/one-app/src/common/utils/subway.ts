export const gneratetAccurateSubwayLineId = (
  filtersSubwayLineId: string,
  userFavoriteLineId: number,
) => {
  switch (filtersSubwayLineId) {
    case 'ALL_LINES':
      return 0;
    case 'ONLY_MY_LINE':
    default:
      return userFavoriteLineId;
  }
};
