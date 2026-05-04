import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-(--color-main-bg) px-6'>
      <div className='text-center max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-(--color-card-border)'>
        {/* Big 404 */}
        <h1 className='text-6xl font-bold text-(--color-primary)'>404</h1>

        {/* Title */}
        <h2 className='text-xl font-semibold mt-4 text-(--color-text-primary)'>
          Page Not Found
        </h2>

        {/* Description */}
        <p className='text-sm mt-2 text-(--color-text-secondary)'>
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className='mt-6 flex flex-col gap-3'>
          <Link
            href='/'
            className='w-full bg-(--color-btn-primary-bg) text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition'>
            Go to Home
          </Link>

          <Link
            href='/login'
            className='w-full border border-(--color-primary) text-(--color-primary) py-3 rounded-xl text-sm font-medium hover:bg-(--color-primary) hover:text-white transition'>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
