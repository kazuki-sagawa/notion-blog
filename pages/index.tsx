import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getAllPosts, getPostsTopPage } from '@/lib/notionAPI'
import { SinglePost } from './components/Post/SinglePost'
import { GetStaticProps } from 'next'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps: GetStaticProps = async () => {
  const Posts = await getPostsTopPage(4);

  return {
    props: {
      Posts,
    },
    revalidate: 60,
  }
}

export default function Home({ Posts }) {
  return (
    <div className='container h-full w-full mx-auto'>
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container w-full mt-16'>
        <h1 className='text-4xl font-medium text-center mb-16'>
          Notion Blog🚀
        </h1>
        {Posts.map((post, index) => (
          <div className='mx-4' key={index}>
            <SinglePost
              title={post.title}
              description={post.description}
              data={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
        <Link
          href="/posts/page/1"
          className='mb-6 lg:w-1/2 mx-auto rounded-md px-5 block text-right'
        >
          ...もっとみる
        </Link>
      </main>
    </div>
  )
}
