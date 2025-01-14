import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="rgb(196, 212, 252)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 7H4C3.44772 7 3 7.44772 3 8V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V8C21 7.44772 20.5523 7 20 7Z" stroke="rgb(196, 212, 252)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.2793 4H9.72082C9.29039 4 8.90825 4.27543 8.77214 4.68377L8.4388 5.68377C8.22296 6.3313 8.70493 7 9.38749 7H14.6126C15.2952 7 15.7772 6.3313 15.5613 5.68377L15.228 4.68377C15.0919 4.27543 14.7097 4 14.2793 4Z" stroke="rgb(196, 212, 252)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const UploadIcon = () => (
  <div
    className="format"
    css={[
      cssUtils.flexCenterCenter,
      { width: '16px', height: '16px', position: 'relative', top: '-1px' },
    ]}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
