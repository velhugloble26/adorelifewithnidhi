import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/ui/PageHero";
import connectDB from "@/config/dbconnection";
import { Blog } from "@/schema/schema";

export const metadata: Metadata = {
  title: "Blog",
  description: "Gentle reflections and practical insights for emotional wellbeing, relationships, and self-understanding.",
};

type BlogSummary = { _id: string; title: string; slug: string; category: string; excerpt: string; image: string; created_at: string };

async function getBlogs(): Promise<BlogSummary[]> {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ created_at: -1 }).lean();
    return blogs.map((blog) => ({
      _id: String(blog._id), title: blog.title, slug: blog.slug, category: blog.category,
      excerpt: blog.excerpt, image: blog.image, created_at: new Date(blog.created_at).toISOString(),
    }));
  } catch (error) {
    console.error("PUBLIC_BLOGS_ERROR:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <><Navbar /><main>
    <PageHero eyebrow="Reflections & Resources" headline="A little understanding can change how you see yourself." body="Explore thoughtful perspectives on emotional wellbeing, relationships, and the patterns that shape everyday life." centered />
    <section className="section-pad mx-auto w-full max-w-[1440px] pb-24 md:pb-32">
      {blogs.length === 0 ? <div className="mx-auto max-w-2xl rounded-xl border border-surface bg-surface-low p-10 text-center">
        <span className="material-symbols-outlined mb-4 text-4xl ui-accent" aria-hidden="true">article</span>
        <h2 className="text-headline-md mb-3 ui-heading">New reflections are on their way.</h2>
        <p className="text-body-md ui-copy">Please return soon for articles from Adore Life.</p>
      </div> : <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{blogs.map((blog) =>
        <article key={blog._id} className="group overflow-hidden rounded-xl border border-surface bg-surface-lowest shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <Link href={`/blog/${blog.slug}`} className="block">
            <div className="aspect-[16/10] overflow-hidden surface-container"><Image src={blog.image} alt={blog.title} width={1200} height={750} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
            <div className="p-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="text-label-md uppercase tracking-widest ui-accent">{blog.category}</span><time className="text-label-md ui-muted" dateTime={blog.created_at}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(blog.created_at))}</time></div>
              <h2 className="text-headline-md mb-3 ui-heading">{blog.title}</h2><p className="text-body-md mb-6 line-clamp-3 ui-copy">{blog.excerpt}</p><span className="text-label-md border-b ui-link-accent">Read article</span>
            </div>
          </Link>
        </article>)}</div>}
    </section>
  </main></>;
}
