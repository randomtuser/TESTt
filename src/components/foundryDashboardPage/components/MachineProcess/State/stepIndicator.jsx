import React from 'react';

const StepIndicator = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Idling</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__info info2   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Heating</span>
              <svg width='45' height='5' viewBox='0 0 45 5' fill='none' xmlns=''>
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>

          <div className='machine-process__info info3   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Adding</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>

          <div className='machine-process__info info4   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Degassing</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>

          <div className='machine-process__info info6   '>
            <div className='flex flex-col items-center  justify-center'>
              <span className='mb-1 text-xs'>Pouring</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1  active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Idling</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info2 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Heating</span>
              <svg width='45' height='5' viewBox='0 0 45 5' fill='none' xmlns=''>
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info3   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Adding</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info4   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Degassing</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info6   '>
            <div className='flex flex-col items-center  justify-center'>
              <span className='mb-1 text-xs'>Pouring</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1 active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Idling</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info2   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Heating</span>
              <svg width='45' height='5' viewBox='0 0 45 5' fill='none' xmlns=''>
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line  '></div>
          <div className='machine-process__info info3   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Adding</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info4   '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Degassing</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info6   '>
            <div className='flex flex-col items-center  justify-center'>
              <span className='mb-1 text-xs'>Pouring</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Idling</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info2 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Heating</span>
              <svg width='45' height='5' viewBox='0 0 45 5' fill='none' xmlns=''>
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info3 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Adding</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info4 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Degassing</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info6   '>
            <div className='flex flex-col items-center  justify-center'>
              <span className='mb-1 text-xs'>Pouring</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1 active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Idling</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info2  active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Heating</span>
              <svg width='45' height='5' viewBox='0 0 45 5' fill='none' xmlns=''>
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info3 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Adding</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info4  active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Degassing</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info6   '>
            <div className='flex flex-col items-center  justify-center'>
              <span className='mb-1 text-xs'>Pouring</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#CCCCCC' />
              </svg>
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1 active  '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Idling</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info2  active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Heating</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info3  active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Adding</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info4  active '>
            <div className='mr-2 flex flex-col  items-center justify-center'>
              <span className='mb-1 text-xs'>Degassing</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info6  active '>
            <div className='flex flex-col items-center  justify-center'>
              <span className='mb-1 text-xs'>Pouring</span>
              <svg
                width='45'
                height='5'
                viewBox='0 0 45 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='45' height='5' rx='2.5' fill='#FB8450' />
              </svg>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className='machine-process__info-progress'>
          <div className='machine-process__info info1'>
            <div className='machine-process__info-icon'></div>
          </div>

          <div className='machine-process__progress-line'></div>
          <div className='machine-process__info info2'>
            <div className='machine-process__info-icon'></div>
          </div>

          <div className='machine-process__progress-line'></div>
          <div className='machine-process__info info3'>
            <div className='machine-process__info-icon'></div>
          </div>

          <div className='machine-process__progress-line '></div>
          <div className='machine-process__info info4'>
            <div className='machine-process__info-icon'></div>
          </div>

          <div className='machine-process__progress-line'></div>
          <div className='machine-process__info info5'>
            <div className='machine-process__info-icon'></div>
          </div>

          <div className='machine-process__progress-line'></div>
          <div className='machine-process__info info6'>
            <div className='machine-process__info-icon'></div>
          </div>
        </div>
      );
  }
};

export default StepIndicator;
