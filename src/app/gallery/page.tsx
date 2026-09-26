import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/ui/PageHero";
import connectDB from "@/config/dbconnection";
import { Gallery } from "@/schema/schema";

export const metadata: Metadata = { title: "Gallery", description: "Moments, spaces, and programmes from the Adore Life community." };
type GalleryItem = { _id: string; title: string; description: string; image: string };

async function getGallery(): Promise<GalleryItem[]> {
  try {
    await connectDB();
    const items = await Gallery.find({}).sort({ created_at: -1 }).lean();
    return items.map((item) => ({ _id: String(item._id), title: item.title, description: item.description, image: item.image }));
  } catch (error) {
    console.error("PUBLIC_GALLERY_ERROR:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGallery();
  return <><Navbar /><main>
    <PageHero eyebrow="Our Gallery" headline="A glimpse into the spaces we create together." body="Explore moments from conversations, workshops, community programmes, and the quiet spaces that make understanding possible." centered />
    <section className="section-pad mx-auto w-full max-w-[1440px] pb-24 md:pb-32">
      {items.length === 0 ? <div className="mx-auto max-w-2xl rounded-xl border border-surface bg-surface-low p-10 text-center">
        <span className="material-symbols-outlined mb-4 text-4xl ui-accent" aria-hidden="true">photo_library</span><h2 className="text-headline-md mb-3 ui-heading">Our gallery is being curated.</h2><p className="text-body-md ui-copy">Please return soon to see moments from Adore Life.</p>
      </div> : <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">{items.map((item) =>
        <figure key={item._id} className="group mb-6 break-inside-avoid overflow-hidden rounded-xl border border-surface bg-surface-lowest shadow-sm">
          <div className="overflow-hidden surface-container"><Image src={item.image} alt={item.title} width={1200} height={900} className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
          <figcaption className="p-6"><h2 className="text-headline-md mb-2 ui-heading">{item.title}</h2><p className="text-body-md ui-copy">{item.description}</p></figcaption>
        </figure>)}</div>}
    </section>
  </main></>;
}
