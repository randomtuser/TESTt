import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TermsData } from './api/terms';
function Terms() {
  const [isOpen, setIsOpen] = useState(false);
  const termsData = TermsData();
  return (
    <>
      <div className='w-full'>
        <header className=' sticky top-0 z-[2] flex items-center justify-between gap-[5%] bg-zinc-800 text-center sm:gap-[8%] md:h-14   '>
          <img src='icons/mm3d_logo.png' alt='MetalMaker 3D' />
          <button onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu
              className='mr-2 block h-6 w-6 text-white lg:hidden'
              aria-hidden='true'
            />
          </button>
        </header>
        {isOpen && (
          <>
            <div className='sticky top-9 z-[5] h-[2%] items-center justify-between overflow-y-scroll  bg-zinc-800 pb-4 pt-2 lg:hidden'>
              <div className=' pl-2'>
                <li className='text-white '>
                  <a href='#Introduction' className='mb-1'>
                    {termsData.sections[0]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Communication' className=''>
                    {termsData.sections[1]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Contests' className='my-2'>
                    {termsData.sections[2]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Content' className='my-1'>
                    {termsData.sections[3]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Prohibited Uses' className='my-1'>
                    {termsData.sections[4]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Analytics' className='my-1'>
                    {termsData.sections[5]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#No Use By Minors' className='my-1'>
                    {termsData.sections[6]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Accounts' className='my-1'>
                    {termsData.sections[7]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Intellectual Property' className='my-1'>
                    {termsData.sections[8]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Copyright Policy' className='my-1'>
                    {termsData.sections[9]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a
                    href='#DMCA Notice and Procedure for Copyright Infringement Claims'
                    className='my-1'
                  >
                    {termsData.sections[10]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Error Reporting and Feedback' className='my-1'>
                    {termsData.sections[11]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Links To Other Web Sites' className='my-1'>
                    {termsData.sections[12]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Disclaimer Of Warranty' className='my-1'>
                    {termsData.sections[13]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Limitation Of Liability' className='my-1'>
                    {termsData.sections[14]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Termination' className='my-1'>
                    {termsData.sections[15]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Governing Law' className='my-1'>
                    {termsData.sections[16]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Changes To Service' className='my-1'>
                    {termsData.sections[17]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Amendments To Terms' className='my-1'>
                    {termsData.sections[18]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Waiver And Severability' className='my-1'>
                    {termsData.sections[19]}
                  </a>
                </li>
                <li className='my-2 text-white'>
                  <a href='#Acknowledgement' className='my-1'>
                    {termsData.sections[20]}
                  </a>
                </li>
                <li className='text-white'>
                  <a href='#Contact Us' className='my-1'>
                    {termsData.sections[21]}
                  </a>
                </li>
              </div>
            </div>
          </>
        )}
        <div className='mt-2 flex justify-center text-center text-5xl font-bold'>
          <h1>Terms of service</h1>
        </div>

        <div className='flex w-full flex-row '>
          <div className='hidden h-screen lg:flex'>
            <div className='h-screen w-full'>
              <div className='left-0 top-14 mb-1 h-[92%] w-60 overflow-y-scroll border-r-2 border-zinc-200 bg-zinc-100 pl-2 pt-2  lg:fixed'>
                <a href='#Introduction' className='my-1'>
                  {termsData.sections[0]}
                </a>
                <a href='#Communication' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[1]}
                </a>
                <a href='#Contests' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[2]}
                </a>
                <a href='#Content' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[3]}
                </a>
                <a href='#Prohibited Uses' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[4]}
                </a>
                <a href='#Analytics' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[5]}
                </a>
                <a href='#No Use By Minors' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[6]}
                </a>
                <a href='#Accounts' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[7]}
                </a>
                <a href='#Intellectual Property' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[8]}
                </a>
                <a href='#Copyright Policy' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[9]}
                </a>
                <a
                  href='#DMCA Notice and Procedure for Copyright Infringement Claims'
                  className='my-1'
                >
                  <br />
                  <br />
                  {termsData.sections[10]}
                </a>
                <a href='#Error Reporting and Feedback' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[11]}
                </a>
                <a href='#Links To Other Web Sites' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[12]}
                </a>
                <a href='#Disclaimer Of Warranty' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[13]}
                </a>
                <a href='#Limitation Of Liability' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[14]}
                </a>
                <a href='#Termination' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[15]}
                </a>
                <a href='#Governing Law' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[16]}
                </a>
                <a href='#Changes To Service' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[17]}
                </a>
                <a href='#Amendments To Terms' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[18]}
                </a>
                <a href='#Waiver And Severability' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[19]}
                </a>
                <a href='#Acknowledgement' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[20]}
                </a>
                <a href='#Contact Us' className='my-1'>
                  <br />
                  <br />
                  {termsData.sections[21]}
                </a>
              </div>
            </div>
          </div>
          <div className=''>
            <div className=' h-full lg:ml-56'>
              <div className='ml-8 mt-5'>Last updated: 2023-06-17</div>
              <div id='Introduction' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'> Introduction </h1>
                <p>{termsData.description.introduction[0]}</p>
                <p>{termsData.description.introduction[1]}</p>
                <p>{termsData.description.introduction[2]}</p>
                <p>{termsData.description.introduction[3]}</p>
                <p>{termsData.description.introduction[4]}</p>
              </div>
              <div id='Communication' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Communications</h1>
                <p>{termsData.description.communications[0]}</p>
              </div>
              <div id='Contests' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Contests, Sweepstakes and Promotions
                </h1>
                <p>{termsData.description.contestsAndPromotions[0]}</p>
              </div>
              <div id='Content' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Content</h1>
                <p>{termsData.description.content[0]}</p>
                <p>{termsData.description.content[1]}</p>
                <p>{termsData.description.content[2]}</p>
                <p>{termsData.description.content[3]}</p>
                <p>{termsData.description.content[4]}</p>
              </div>
              <div id='Prohibited Uses' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Prohibited Uses</h1>
                <p>{termsData.description.prohibited[0]}</p>
                <p>{termsData.description.prohibited[1]}</p>
                <p>{termsData.description.prohibited[2]}</p>
                <p>{termsData.description.prohibited[3]}</p>
                <p>{termsData.description.prohibited[4]}</p>
                <p>{termsData.description.prohibited[5]}</p>
                <p>{termsData.description.prohibited[6]}</p>
                <p>{termsData.description.prohibited[7]}</p>
                <p>{termsData.description.prohibited[8]}</p>
                <p>{termsData.description.prohibited[9]}</p>
                <p>{termsData.description.prohibited[10]}</p>
                <p>{termsData.description.prohibited[11]}</p>
                <p>{termsData.description.prohibited[12]}</p>
                <p>{termsData.description.prohibited[13]}</p>
                <p>{termsData.description.prohibited[14]}</p>
                <p>{termsData.description.prohibited[15]}</p>
                <p>{termsData.description.prohibited[16]}</p>
                <p>{termsData.description.prohibited[17]}</p>
              </div>
              <div id='Analytics' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Analytics</h1>
                <p>{termsData.description.analytics[0]}</p>
              </div>
              <div id='No Use By Minors' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>No Use By Minors</h1>
                <p>{termsData.description.analytics[1]}</p>
              </div>
              <div id='Accounts' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'> Accounts</h1>
                <p>{termsData.description.accounts[0]}</p>
                <p>{termsData.description.accounts[1]}</p>
                <p>{termsData.description.accounts[2]}</p>
                <p>{termsData.description.accounts[3]}</p>
              </div>
              <div id='Intellectual Property' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Intellectual Property
                </h1>
                <p>{termsData.description.intellectual[0]}</p>
              </div>
              <div id='Copyright Policy' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Copyright Policy</h1>
                <p>{termsData.description.copyright[0]}</p>
                <p>{termsData.description.copyright[1]}</p>
                <p>{termsData.description.copyright[2]}</p>
              </div>
              <div
                id='DMCA Notice and Procedure for Copyright Infringement Claims'
                className=' mx-10 my-16 flex flex-col gap-4 text-justify'
              >
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  DMCA Notice and Procedure for Copyright Infringement Claims
                </h1>
                <p>{termsData.description.DMCA[0]}</p>

                <p>{termsData.description.DMCA[1]}</p>
                <p>{termsData.description.DMCA[2]}</p>
                <p>{termsData.description.DMCA[3]}</p>
                <p>{termsData.description.DMCA[4]}</p>
                <p>{termsData.description.DMCA[5]}</p>
                <p>{termsData.description.DMCA[6]}</p>
                <p>{termsData.description.DMCA[7]}</p>
              </div>
              <div id='Error Reporting and Feedback' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Error Reporting and Feedback
                </h1>
                <p>{termsData.description.error[0]}</p>
              </div>
              <div
                id='Links To Other Web Sites'
                className=' mx-10 my-16 flex flex-col gap-4 text-justify'
              >
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Links To Other Web Sites
                </h1>
                <p>{termsData.description.links[0]}</p>

                <p>{termsData.description.links[1]}</p>
                <p>{termsData.description.links[2]}</p>
                <p>{termsData.description.links[3]}</p>
              </div>
              <div
                id='Disclaimer Of Warranty'
                className=' mx-10 my-16 flex flex-col gap-4 text-justify'
              >
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Disclaimer Of Warranty
                </h1>
                <p>{termsData.description.disclaimer[0]}</p>
                <p>{termsData.description.disclaimer[1]}</p>
                <p>{termsData.description.disclaimer[2]}</p>
                <p>{termsData.description.disclaimer[3]}</p>
              </div>
              <div id='Limitation Of Liability' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Limitation Of Liability
                </h1>
                <p>{termsData.description.limitation[0]}</p>
              </div>
              <div id='Termination' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Termination</h1>
                <p>{termsData.description.termination[0]}</p>

                <p>{termsData.description.termination[1]}</p>
                <p>{termsData.description.termination[2]}</p>
              </div>
              <div id='Governing Law' className=' mx-10 my-16 flex flex-col gap-4 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Governing Law</h1>
                <p>{termsData.description.governing[0]}</p>
                <p>{termsData.description.governing[1]}</p>
              </div>
              <div id='Changes To Service' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Changes To Service</h1>
                <p>{termsData.description.changes[0]}</p>
              </div>
              <div
                id='Amendments To Terms'
                className=' mx-10 my-16 flex flex-col gap-4 text-justify'
              >
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Amendments To Terms</h1>
                <p>{termsData.description.amendments[0]}</p>
                <p>{termsData.description.amendments[1]}</p>
                <p>{termsData.description.amendments[2]}</p>
              </div>
              <div
                id='Waiver And Severability'
                className=' mx-10 my-16 flex flex-col gap-4 text-justify'
              >
                <h1 className='my-4 flex justify-start text-2xl font-bold'>
                  Waiver And Severability
                </h1>
                <p>{termsData.description.waiver[0]}</p>
                <p>{termsData.description.waiver[1]}</p>
              </div>
              <div id='Acknowledgement' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Acknowledgement</h1>
                <p>{termsData.description.acknowledgement[0]}</p>
              </div>
              <div id='Contact Us' className=' mx-10 my-16 text-justify'>
                <h1 className='my-4 flex justify-start text-2xl font-bold'>Contact Us</h1>
                <p>{termsData.description.contact[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;
