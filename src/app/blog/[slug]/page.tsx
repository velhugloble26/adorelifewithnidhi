import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import connectDB from "@/config/dbconnection";
import { Blog } from "@/schema/schema";

type BlogArticle = { title: string; category: string; excerpt: string; image: string; content: string; created_at: string };

async function getBlog(slug: string): Promise<BlogArticle | null> {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    return { title: blog.title, category: blog.category, excerpt: blog.excerpt, image: blog.image, content: blog.content, created_at: new Date(blog.created_at).toISOString() };
  } catch (error) {
    console.error("PUBLIC_BLOG_ERROR:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  return blog ? { title: blog.title, description: blog.excerpt, openGraph: { images: [blog.image] } } : { title: "Article not found" };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();
  return <><Navbar /><main className="pb-24 md:pb-32"><article>
    <header className="section-pad mx-auto w-full max-w-[1000px] py-16 text-center md:py-24">
      <Link href="/blog" className="text-label-md mb-8 inline-flex items-center gap-2 ui-link-accent"><span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>All articles</Link>
      <p className="text-label-md mb-5 uppercase tracking-widest ui-accent">{blog.category}</p><h1 className="text-display-lg mb-6 ui-heading">{blog.title}</h1><p className="text-body-lg mx-auto mb-6 max-w-3xl ui-copy">{blog.excerpt}</p>
      <time className="text-label-md ui-muted" dateTime={blog.created_at}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(blog.created_at))}</time>
    </header>
    <div className="section-pad mx-auto mb-14 w-full max-w-[1200px]"><div className="aspect-[16/9] overflow-hidden rounded-xl surface-container"><Image src={blog.image} alt={blog.title} width={1600} height={900} priority className="h-full w-full object-cover" /></div></div>
    <div className="section-pad mx-auto w-full max-w-[850px]"><div className="text-body-lg whitespace-pre-line ui-copy">{blog.content}</div></div>
  </article></main></>;
}
