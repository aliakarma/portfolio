import Head from 'next/head'
import { useRouter } from 'next/router'
import { SITE_NAME, SITE_URL, OG_IMAGE_URL } from '../data/site'

export default function Meta({
  title,
  description,
  image = OG_IMAGE_URL,
  type = 'website',
  robots = 'index, follow',
}) {
  const router = useRouter()

  const asPath = (router?.asPath || '/').split('?')[0].split('#')[0]
  const canonicalPath = asPath === '/' ? '/' : (asPath.endsWith('/') ? asPath : `${asPath}/`)
  const canonical = `${SITE_URL}${canonicalPath}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  /* BreadcrumbList structured data for subpages — helps Google render
     breadcrumb trails in search results */
  const breadcrumbs = canonicalPath !== '/' && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: title, item: canonical },
    ],
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Ali Akarma" />
      <meta name="creator" content="Ali Akarma" />
      <meta name="publisher" content="Ali Akarma" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Ali Akarma - AI Researcher specializing in Agentic AI and AI Safety" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Ali Akarma - AI Researcher specializing in Agentic AI and AI Safety" />

      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
    </Head>
  )
}
