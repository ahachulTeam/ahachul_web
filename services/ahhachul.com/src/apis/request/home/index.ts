const getLostFoundList = (params: ParamsOfLostFoundList) =>
  base.get<IResponse<LostList>>(
    `${routes['lost-found']}?${objectToQueryString(params, { removeZero: true })}`,
  );

const getLostFoundDetail = (articleId: number) =>
  base.get<IResponse<LostFoundDetail>>(`${routes['lost-found']}/${articleId}`);

const getLostFoundComments = (articleId: number) =>
  base.get<IResponse<CommentList>>(`${routes['lost-found']}/${articleId}/comments`);

export const postLostAndFoundArticle = async (form: LostForm) => {
  const formDataWithoutImages = Object.entries(form).reduce(
    (acc, [key, value]) => {
      if (key !== 'imageFiles') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Omit<LostForm, 'imageFiles'>,
  );

  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(formDataWithoutImages)], {
    type: 'application/json',
  });
  formData.append('content', jsonBlob);

  if (form.imageFiles && Array.isArray(form.imageFiles)) {
    form.imageFiles.forEach(file => {
      formData.append('files', file, file.name);
    });
  }

  const response = await base.post<IResponse<Pick<LostFoundDetail, 'id' | 'images'>>>(
    routes['lost-found'],
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const postComment = async (data: {
  postId: number;
  content: string;
  upperCommentId: number;
  isPrivate: boolean;
}) => {
  const { postId, content, upperCommentId, isPrivate } = data;
  const response = await base.post<IResponse<Pick<Comment, 'id' | 'upperCommentId' | 'content'>>>(
    `${routes['lost-found']}/${postId}/comments`,
    {
      content,
      upperCommentId,
      isPrivate,
    },
  );
  return response.data;
};
