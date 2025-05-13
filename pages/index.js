import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>MCMPORTAL - Teacher Dashboard</title>
        <meta name="description" content="Teacher Dashboard for Education Management Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to MCMPORTAL Teacher Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/create-lesson" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Create Lesson</h2>
            <p className="text-gray-600">Create AI-generated lesson plans for your classes</p>
          </Link>
          
          {/* Add more dashboard cards as needed */}
        </div>
      </main>
    </div>
  );
}
