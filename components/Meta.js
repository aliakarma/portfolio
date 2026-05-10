import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Meta({ 
  title, 
  description, 
  image = 'https://aliakarma.codes/og-image.png',
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
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Ali Akarma" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
