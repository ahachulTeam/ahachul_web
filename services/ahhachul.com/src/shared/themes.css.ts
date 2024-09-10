import { vars } from '@ahhachul/themes';

const PAGE_PADDING_TOP = '16px';
const SIDE_GUTTER = '20px';
const HEADER_HEIGHT = '58px';
const NAVBAR_HEIGHT = '109px';
const BOTTOM_DIM_HEIGHT = '200px';

const themes = {
  selector: 'cupertino',
  color: {
    ...vars.colors.$scale,
  },
  typography: {
    ...vars.typography,
  },
  dimensions: {
    ...vars.zIndex,
    size: {
      gutter: SIDE_GUTTER,
      pagePaddingTop: PAGE_PADDING_TOP,
      height: {
        header: HEADER_HEIGHT,
        navbar: NAVBAR_HEIGHT,
        bottomDim: BOTTOM_DIM_HEIGHT,
      },
    },
  },
  layout: {
    ...vars.box,
  },
} as const;

export default themes;
