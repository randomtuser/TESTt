import React from 'react';
import { QRCode } from 'react-qrcode-logo';

export function generateCode(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let cadena = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    cadena += chars[randomIndex];
  }

  return cadena;
}

export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const QrCode = (props) => {
  return (
    <div>
      {/* <img src={QrCodeSVG} alt='qrCode' width={window.innerWidth < 640 ? '150' : ''} /> */}
      <div className='block dark:hidden'>
        <QRCode
          value={props.code}
          ecLevel='H'
          size={250}
          quietZone={10}
          logoImage={process.env.PUBLIC_URL + '/icons/logoBlack.png'}
          logoWidth={70}
          removeQrCodeBehindLogo
          bgColor='#FFFFFF'
          fgColor='#000000'
          logoPadding={6}
          qrStyle='dots'
        />
      </div>
      <div className='hidden dark:block'>
        <QRCode
          value={props.code}
          ecLevel='H'
          size={250}
          quietZone={10}
          logoImage={process.env.PUBLIC_URL + '/icons/logo.png'}
          logoWidth={70}
          removeQrCodeBehindLogo
          bgColor='#1b1b1b'
          fgColor='#FFFFFF'
          logoPadding={6}
          qrStyle='dots'
        />
      </div>
    </div>
  );
};

export default QrCode;
