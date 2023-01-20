import { oembed } from '@loomhq/loom-embed'
import Image from 'next/image'
import { useState } from 'react'

export default function VideoComponent({
  youtubeId,
  title = '',
  loomId,
  file,
  autoPlay = false,
  loop = false,
  muted = true,
}) {
  const [videoHTML, setVideoHTML] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailWidth, setThumbnailWidth] = useState(0)
  const [thumbnailHeight, setThumbnailHeight] = useState(0)
  const videoUrl = `https://www.loom.com/share/${loomId}`

  async function setupLoom() {
    const { html, thumbnail_url, thumbnail_height, thumbnail_width } =
      await oembed(videoUrl, {
        hideOwner: true,
        gifThumbnail: false,
      })
    setThumbnailWidth(thumbnail_width)
    setThumbnailHeight(thumbnail_height)
    setThumbnail(thumbnail_url)
    setVideoHTML(html)
  }

  console.log({ youtubeId, file, loomId })

  if (loomId) {
    setupLoom()
    return <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
  } else if (file) {
    return (
      <video
        muted
        autoPlay={autoPlay}
        loop={loop}
        playsInline={true}
        draggable={false}
      >
        <source src={file} />
      </video>
    )
  } else if (youtubeId) {
    return (
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?hl=en_GB&amp;version=3&amp;rel=0&listType=user_uploads&loop=1&modestbranding=1&iv_load_policy=3&cc_lang_pref=en&cc_load_policy=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title || 'Embedded youtube'}
        />
      </div>
    )
  }

  // return (
  //   thumbnail &&
  //     <Image
  //       src={thumbnail}
  //       width={thumbnailWidth}
  //       height={thumbnailHeight}
  //       alt="video"
  //       quality={10}
  //     />
  // )
}
