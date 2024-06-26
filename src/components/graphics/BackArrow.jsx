
import "./graphics.css"
export default function BackArrow({ backArrowRef, className = "", id = "", alt, ...props }) {
    return (
        <svg ref={backArrowRef} aria-label={alt} className={className} id={id} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" {...props}>
            <path d="M69.5866 90L162 90C167.523 90 172 94.4772 172 100C172 105.523 167.523 110 162 110L69.5866 110C68.6726 110 68.2376 111.125 68.9139 111.74L92.8394 133.49C96.7818 137.074 97.0405 143.187 93.4151 147.091C89.8561 150.924 83.8801 151.192 79.9924 147.693L33.6071 105.946C30.076 102.768 30.076 97.2316 33.6071 94.0536L79.9924 52.3068C83.8801 48.8079 89.8561 49.0758 93.4151 52.9086C97.0405 56.8129 96.7818 62.9256 92.8394 66.5096L68.9139 88.2601C68.2376 88.8749 68.6726 90 69.5866 90Z" className="fill-text-main" />
        </svg>
    )
}