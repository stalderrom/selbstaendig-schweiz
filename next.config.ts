import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/artikel/selbststaendig-machen-schweiz",
        destination: "/artikel/selbstaendig-machen-schweiz",
        permanent: true,
      },
      {
        source: "/artikel/mwst-selbstaendige",
        destination: "/artikel/mwst-selbststaendige",
        permanent: true,
      },
      {
        source: "/artikel/ahv-selbstaendige-beitraege-schweiz",
        destination: "/artikel/ahv-selbststaendige",
        permanent: true,
      },
      {
        source: "/artikel/versicherungen-selbstaendige-schweiz",
        destination: "/artikel/versicherungen-selbststaendige",
        permanent: true,
      },
      {
        source: "/artikel/steuern-selbstaendige-schweiz",
        destination: "/artikel/steuern-selbststaendige",
        permanent: true,
      },
      {
        source: "/artikel/kosten-firmengr%C3%BCndung-gmbh-schweiz",
        destination: "/artikel/kosten-firmengruendung-gmbh-schweiz",
        permanent: true,
      },
      {
        source: "/rechner",
        destination: "/rechner/stundensatz",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
