import Image from 'next/image'
import Link from 'next/link'
import { getBasePath } from '@/utils/fileUtils'
import { useState } from 'react'

const LinksSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setMessage('Thank you for subscribing! We\'ll keep you updated with the latest releases.');
      form.reset();
      // Close modal after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      {/* Hidden form for Netlify to detect during build */}
      <form name="subscribe" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="email" name="email" />
        <input type="hidden" name="form-name" value="subscribe" />
      </form>

      <div className="flex justify-center font-medium gap-8 sm:gap-8 my-2">
        <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 384 512" 
            fill="currentColor" 
            aria-hidden="true" 
            focusable="false" 
            role="img"
          >
            <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"/>
          </svg>
          Paper (Coming Soon)
        </Link>
        <Link href="https://github.com/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <Image
            src={`${getBasePath()}/github.png`}
            alt="GitHub"
            width={10}
            height={20}
            className="w-5 h-5 max-w-full h-auto"
          />
          GitHub
        </Link>
        <Link href="https://huggingface.co/datasets/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <Image
            src={`${getBasePath()}/hg.png`}
            alt="Huggingface"
            width={10}
            height={20}
            className="w-5 h-5 max-w-full h-auto"
          />
          Dataset
          <span className="text-gray-500 text-sm font-mono"> </span>
        </Link>
        <Link href="https://huggingface.co/datasets/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <Image
            src={`${getBasePath()}/hg.png`}
            alt="Reasoning Trace"
            width={10}
            height={20}
            className="w-5 h-5 max-w-full h-auto"
          />
          Traces
          <span className="text-gray-500 text-sm font-mono"> </span>
        </Link>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Subscribe for New Releases
        </button>
      </div>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setStatus('idle');
                setMessage('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Stay Updated with LiveSQLBench
              </h3>
              <p className="text-gray-600 mb-6">
                Subscribe to receive updates about LiveSQLBench:
                <ul className="text-left mt-2 space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    New database and tasks releases
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Code releases
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Research paper notifications
                  </li>
                </ul>
              </p>

              <form 
                onSubmit={handleSubmit}
                name="subscribe"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="subscribe" />
                <input type="hidden" name="bot-field" />
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${status === 'loading' || status === 'success' 
                        ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
                        : 'border-gray-300'}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors
                    ${status === 'loading' || status === 'success'
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {status === 'loading' ? 'Subscribing...' : 
                   status === 'success' ? 'Subscribed!' : 
                   'Subscribe for New Releases'}
                </button>
                {message && (
                  <div className={`mt-2 p-3 rounded-lg ${
                    status === 'success' 
                      ? 'bg-green-50 text-green-700' 
                      : status === 'error'
                      ? 'bg-red-50 text-red-700'
                      : ''
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LinksSection