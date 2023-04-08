import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getAllPosts, getNumberOfPages, getPostsByPage, getPostsTopPage } from '@/lib/notionAPI'
import { SinglePost } from '@/pages/components/Post/SinglePost'
import { GetStaticProps } from 'next'
import Pagination from '@/pages/components/Pagination/Pagination'

const inter = Inter({ subsets: ['latin'] })

/** page番号の取得 */
export const getStaticPaths: GetStaticProps = async () => {
    const numberOgPage = await getNumberOfPages();


    return {
        paths: [{params: {tag: "blog", page: "1"}}],
        fallback: "blocking"
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const currentPage = context.params?.page;
    const postsByPage = await getPostsByPage(parseInt(currentPage.toString(), 10));

    const numberOgPage = await getNumberOfPages();

    return {
        props: {
            postsByPage,
            numberOgPage,
        },
        revalidate: 60,
    }
}

const BlogTagPageList = ({ postsByPage, numberOgPage }) => {
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
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
            {postsByPage.map((post, index) => (
            <div key={index}>
                <SinglePost
                title={post.title}
                description={post.description}
                data={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
                />
            </div>
            ))}
        </section>
        <Pagination
            numberOgPage={numberOgPage}
         />
      </main>
    </div>
  )
}

export default BlogTagPageList;