import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Meta({ 
  title, 
  description, 
  image = 'https://aliakarma.codes/og-image-v2.jpg',
  type = 'website' 
}) {
  const router = useRouter()
  const domain = 'https://aliakarma.codes'
  const canonical = `${domain}${router.asPath === '/' ? '' : router.asPath.split('?')[0]}`
  const fullTitle = title === 'Ali Akarma' ? title : `${title} | Ali Akarma`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Ali Akarma" />
      <meta name="creator" content="Ali Akarma" />
      <meta name="publisher" content="Ali Akarma" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Ali Akarma - AI Researcher specializing in Agentic AI and AI Safety" />
      <meta property="og:site_name" content="Ali Akarma" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Ali Akarma - AI Researcher specializing in Agentic AI and AI Safety" />
    </Head>
  )
}
