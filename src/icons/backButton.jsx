import React from 'react';

export default function BackButtonMobile() {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='52'
        height='52'
        viewBox='0 0 52 52'
        fill='none'
      >
        <g filter='url(#filter0_d_2899_42022)'>
          <rect
            x='10'
            y='9'
            width='32'
            height='32'
            rx='5'
            fill='#FDFDFD'
            shape-rendering='crispEdges'
          />
          <path
            d='M22 25.0135L28.4865 18.527L30 20.0405L25.027 25.0135L30 29.9865L28.4865 31.5L22 25.0135Z'
            fill='#878787'
            fill-opacity='0.8'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_2899_42022'
            x='0'
            y='0'
            width='52'
            height='52'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='5' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_2899_42022'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_2899_42022'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
