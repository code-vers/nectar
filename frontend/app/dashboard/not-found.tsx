import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='text-center bg-white p-8 rounded-2xl shadow-lg border border-(--color-card-border)'>
        <h1 className='text-5xl font-bold text-(--color-primary)'>404</h1>

        <h2 className='mt-4 text-lg font-semibold text-(--color-text-primary)'>
          Dashboard Page Not Found
        </h2>

        <p className='mt-2 text-sm text-(--color-text-secondary)'>
          This section doesn't exist in your dashboard.
        </p>

        <Link
          href='/dashboard'
          className='inline-block mt-6 bg-(--color-btn-primary-bg) text-white px-6 py-3 rounded-xl text-sm hover:opacity-90 transition'>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
