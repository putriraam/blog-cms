
import ShareButton from "@/components";
import { getBlogSlug, getBlogs } from "@/lib/blog";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export const generateStaticParams = async () => {
  const blogs = await getBlogs();

  return blogs.map((items: any) => ({
    params: {
      slug: items.fields.slug,
    },
  }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogSlug(params.slug);
  // console.log(blog);
  return {
    title: blog.fields.title,
    description: blog.fields.title,
    authors: blog.fields.author.fields.name,
    openGraph: {
        images: [`https:${blog.fields.img.fields.file.url}`, `https:${blog.fields.author.fields.image.fields.file.url}`],
    },
}
  return {
    title: blog.fields.title,
  };
}

export default async function BlogContent({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogSlug(params.slug);
  console.log(blog);
  return (
    <div className="flex">
        <div className="mt-16 px-20 md:flex hidden text-gray-400">
        <Link href={`/`} className="flex items-center gap-2 ">
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        back
                    </Link>
        <h1><ShareButton slug={blog.fields.slug}/></h1>
        </div>
    <div className="flex flex-col w-screen items-center gap-10 mt-10  px-5">
      <h1 className="text-2xl font-bold text-center">{blog.fields.title}</h1>
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={`http:${blog.fields.author.fields.image.fields.file.url}`}
            alt="Neil image"
          />
        </div>
        <h1 className="text-sm font- truncate dark:text-whitemedium text-gray-500">
          Author: {blog.fields.author.fields.name}
        </h1>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Email: {blog.fields.author.fields.email}
          </p>
        </div>
        <h1 className="text-sm text-gray-500 truncate dark:text-gray-400">
          Date: {blog.fields.date}
        </h1>
      </div>
      <div className="block md:hidden">
      <h1><ShareButton slug={blog.fields.slug}/></h1>
      </div>
      <img
        src={`https:${blog.fields.img.fields.file.url}`}
        alt="image"
        className="w-96"
      ></img>
      <div className="flex flex-col sm:px-36 px-5 gap-5 text-justify">
        {documentToReactComponents(blog.fields.content)}
      </div>
    </div>
    </div>
  );
}
