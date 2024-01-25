import Link from 'next/link'

export default function Custom404() {
  return (
    <div
      style={{ height: '100vh', backgroundColor: '#000' }}
      className="flex justify-center items-center w-full"
    >
      <h1>
        <Link href={'/public-page'}>
          <img src="/404.png" />
        </Link>
      </h1>
    </div>
  )
}
