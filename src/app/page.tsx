import { CardBlog } from "@/components/card";
import { getBlogs } from "@/lib/blog";

export default async function Home() {

  const blogs = await getBlogs()
  

  return (
    <div>
      <div className="flex gap-2 flex-warp">
      {
        blogs.map((items: any) => {
          console.log(items.fields.author.fields.image.fields.file.url);
          
          return (
            <CardBlog
              key={items.sys.id}
              title={items.fields?.title}
              img={items.fields.img.fields.file.url}
              img_profile={items.fields.author.fields.image.fields.file.url}
              author={items.fields.author.fields.name}
              email={items.fields.author.fields.email}
              detail={items.fields.slug}
            />
          )
        })
      }
      </div>
    </div>   
  );
}