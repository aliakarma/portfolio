/*
  Serializes structured data for injection into a <script type="application/ld+json">
  tag.

  JSON.stringify does not escape '<'. The contents of a <script> element are raw
  text — the parser does no entity decoding, but it does look for the closing
  tag — so a '</script>' sequence anywhere inside the payload terminates the
  element early and drops the remainder into the document as live markup. The
  same applies to '<!--'.

  Nothing on this site is user-generated, so this is not currently exploitable.
  It matters because publication titles and abstracts are pasted in verbatim
  from papers, and one containing that sequence would silently break the page.

  Escaping '<' alone closes both holes: '<' is valid JSON and parses back
  to an identical object, so consumers (Google, ORCID, scrapers) see no
  difference.
*/
export const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')
