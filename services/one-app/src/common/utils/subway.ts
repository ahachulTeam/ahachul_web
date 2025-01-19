<<<<<<< HEAD
export const formatSubwayLineId = (filtersSubwayLineId: string, userFavoriteLineId: number) => {
=======
export const formatSubwayLineId = (
  filtersSubwayLineId: string,
  userFavoriteLineId: number,
) => {
>>>>>>> main
  switch (filtersSubwayLineId) {
    case 'ALL_LINES':
      return 0;
    case 'ONLY_MY_LINE':
    default:
      return userFavoriteLineId;
  }
};
