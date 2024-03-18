import { useTranslation } from 'react-i18next';
export default function Traducciones() {
  const { t } = useTranslation(['Machines']);

  const traducciones = [
    // Html5QrcodeStrings
    {
      original: 'QR code parse error, error =',
      traduccion: `${t('Qrcode')}`,
    },
    {
      original: 'Error getting userMedia, error =',
      traduccion: `${t('errorMedia')}`,
    },
    {
      original:
        "The device doesn't support navigator.mediaDevices , only supported cameraIdOrConfig in this case is deviceId parameter (string).",
      traduccion: `${t('device')}`,
    },
    {
      original: 'Camera streaming not supported by the browser.',
      traduccion: `${t('camera')}`,
    },
    {
      original: 'Unable to query supported devices, unknown error.',
      traduccion: `${t('unable')}`,
    },
    {
      original: 'Camera access is only supported in secure context like https or localhost.',
      traduccion: `${t('cameraAccess')}`,
    },
    { original: 'Scanner paused', traduccion: `${t('scanner')}` },

    // Html5QrcodeScannerStrings
    { original: 'Scanning', traduccion: `${t('scanning')}` },
    { original: 'Idle', traduccion: `${t('idle')}` },
    { original: 'Error', traduccion: `${t('error')}` },
    { original: 'Permission', traduccion: `${t('permission')}` },
    { original: 'No cameras', traduccion: `${t('noCameras')}` },
    { original: 'Last Match:', traduccion: `${t('match')}` },
    { original: 'Code Scanner', traduccion: `${t('code')}` },
    //{ original: `${t('request')}`, traduccion: 'Solicitar permisos de cámara' },
    //{ original: 'request', traduccion: `${t('request')}` },
    { original: 'Request Camera Permisssions', traduccion: `${t('request')}` },
    {
      original: 'Requesting camera permissions...',
      traduccion: `${t('requesting')}`,
    },
    { original: 'No camera found', traduccion: `${t('noCamera')}` },
    { original: 'Stop Scanning', traduccion: `${t('stopScanning')}` },
    { original: 'Start Scanning', traduccion: `${t('startScanning')}` },
    { original: 'Switch On Torch', traduccion: `${t('switchOn')}` },
    { original: 'Switch off Torch', traduccion: `${t('switchOff')}` },
    { original: 'Failed to turn on torch', traduccion: `${t('failedSwitchOn')}` },
    { original: 'Failed to turn off torch', traduccion: `${t('failedSwitchOff')}` },
    { original: 'Launching Camera...', traduccion: `${t('launch')}` },
    { original: 'Sacan an Image File', traduccion: `${t('scan')}` },
    {
      original: 'Choose Image - No image choosen',
      traduccion: `${t('chose')}`,
    },
    {
      original: 'Scan using camera directly',
      traduccion: `${t('scanUsing')}`,
    },
    { original: 'Select Camera', traduccion: `${t('selectCamera')}` },
    { original: 'Choose Image', traduccion: `${t('chooseImage')}` },
    { original: 'Choose Another', traduccion: `${t('chooseAnother')}` },
    { original: 'No image choosen', traduccion: `${t('imageChoosen')}` },
    { original: 'Anonymous Camera', traduccion: `${t('anonymous')}` },
    { original: 'Or drop an image to scan', traduccion: `${t('drop')}` },
    {
      original: 'Or drop an image to scan',
      traduccion: `${t('drop')}`,
    },
    { original: 'zoom', traduccion: `${t('zoom')}` },
    { original: 'Loading image...', traduccion: `${t('loading')}` },
    { original: 'Camera based scan', traduccion: `${t('cameraBased')}` },
    { original: 'Fule based scan', traduccion: `${t('fule')}` },

    // LibraryInfoStrings
    { original: 'Powered by byScanApp', traduccion: `${t('power')}` },
    { original: 'Report issues', traduccion: `${t('report')}` },

    // Others
    {
      original: 'NotAllowedError: Permission denied',
      traduccion: `${t('notAllowed')}`,
    },
  ];

  return traducciones;
}
