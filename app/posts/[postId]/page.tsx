import { getPostData, getSortedPostsData } from "@/lib/Posts";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import { notFound } from "next/navigation";

// turning posts/[postId] into SSG since we know which values [postId] can take
export function generateStaticParams() {
  const posts = getSortedPostsData(); // deduped

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData(); // deduped
  const { postId } = params;

  // looking for the post to generate metadata
  const post = posts.find((post) => post.id === postId);

  if (!post)
    return {
      title: "Post not found",
    };

  return {
    title: post?.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData(); // deduped
  const { postId } = params;

  // displaying custom not found page on empty route from ./not-found.tsx
  if (!posts.find((post) => post.id === postId)) notFound();

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href={"/"}>⬅️ Back to Home</Link>
        </p>
      </article>
    </main>
  );
}
