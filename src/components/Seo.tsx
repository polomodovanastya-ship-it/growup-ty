import { Helmet } from "react-helmet-async";

const SITE_URL = "https://kak-ty.live";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

const Seo = ({ title, description, path, type = "website" }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="kak-ty.live" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default Seo;
