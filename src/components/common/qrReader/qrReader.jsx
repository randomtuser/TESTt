import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './style.css';
import QrResult from '../../../Pages/qrResult';

const QrReader = (props) => {
  const [result, setResult] = useState();

  /* function scannerTranslator() {
    //if ure reading this its too late signed: David
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
      { original: 'Request Camera Permissions', traduccion: `${t('request')}` },
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
      { original: 'Scan an Image File', traduccion: `${t('scan')}` },
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

    // translating function
    function traducirTexto(texto) {
      const traduccion = props.trad.find((t) => t.original === texto);
      return traduccion ? traduccion.traduccion : texto;
    }

    // translating function nodes
    function traducirNodosDeTexto(nodo) {
      if (nodo.nodeType === Node.TEXT_NODE) {
        nodo.textContent = traducirTexto(nodo.textContent.trim());
      } else {
        for (let i = 0; i < nodo.childNodes.length; i++) {
          traducirNodosDeTexto(nodo.childNodes[i]);
        }
      }
    }

    // Creating MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((nodo) => {
            traducirNodosDeTexto(nodo);
          });
        }
      });
    });

    // Config and execute observer
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    // Translating initial content
    traducirNodosDeTexto(document.body);
  } */

  const qrRef = useRef(null);

  // development
  // var one = false;
  // useEffect(() => {
  //   if (one) {
  //     const scanner = new Html5QrcodeScanner('reader', {
  //       qrbox: 500,
  //       fps: 10,
  //       showTorchButtonIfSupported: true,
  //     });
  //     scanner.render(success);
  //     return () => {
  //       scanner.clear();
  //     };

  //     function success(result) {
  //       scanner.clear();
  //       setResult(result);
  //     }
  //   }

  //   one = true;
  // }, []);

  // PRODUCTION
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: 500,
      fps: 10,
      showTorchButtonIfSupported: true,
    });
    scanner.render(success);
    return () => {
      scanner.clear();
    };

    function success(result) {
      scanner.clear();
      setResult(result);
    }
  }, []);

  return (
    <>
      <div className=''>
        <div id='reader' ref={qrRef} className='dark:bg-[#1B1B1B] dark:text-[#FFFFFFDE]'></div>
      </div>
      {result && result !== undefined ? (
        <QrResult toggleScanner={props.toggleModalScan} qr={result} notify={props.notify} />
      ) : (
        ''
      )}
    </>
  );
};

export default QrReader;
