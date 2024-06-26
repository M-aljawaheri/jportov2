import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
//import { remark } from 'remark'
//import html from 'remark-html'
const postsDirectory = path.join(process.cwd(), 'posts')

// https://nextjs.org/learn-pages-router/basics/data-fetching/blog-data
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       post: 'library-of-babel'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'working-with-openstack'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        post: fileName.replace(/\.md$/, ''), // this must match slug name ([post].js)
      },
    }
  })
}

export async function getPostData(post_name) {
  const fullPath = path.join(postsDirectory, `${post_name}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string (old way of doing this, might go back to it)
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)
  const contentHtml = matterResult.content // processedContent.toString()

  return {
    post_name,
    contentHtml,
    ...matterResult.data,
  }
}
