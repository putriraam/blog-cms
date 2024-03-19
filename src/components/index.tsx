import CopyButton from "./copy"
import FbButton from "./facebook"
import LinkedInButton from "./linkedin"
import TwitterButton from "./twitter"
import WaButton from "./wa"

const base_url = process.env.BASE_URL_WEB || ""

export default function ShareButton({ slug }: { slug: string }) {
    return (
        <div>
            <p className=" text-xs font-bold text-gray-400 py-2 ">BAGIKAN</p>
            <div className="flex gap-1">
                <TwitterButton slug={slug} url={base_url}/>
                <WaButton slug={slug} url={base_url}/>
                <FbButton slug={slug} url={base_url}/>
                <LinkedInButton slug={slug} url={base_url}/>
                <CopyButton slug={slug} url={base_url}/>
            </div>
        </div>
    )
}