export type WebsiteData = {
  siteName: string;
  // 跑马灯
  marquee: MarqueeType;
  links: LinkType[];
  adList: AdType[];
  adTable: AdTableType[];
  adApp: AdAppType[];
  adCard: AdCardType[];
  adFloat: AdFloatType[];
};

export type MarqueeType = {
  text: string;
  link: string;
  textColor?: string;
  bgColor?: string;
};

export type LinkType = {
  id?: string;
  text: string;
  link: string;
  textColor?: string;
  bgColor?: string;
};

export type AdType = {
  id?: string;
  imgUrl: string;
  link: string;
};

export type AdTableType = {
  id?: string;
  text: string;
  link: string;
  textColor?: string;
  bgColor?: string;
};

export type AdAppType = {
  id?: string;
  text: string;
  link: string;
  imgUrl: string;
};

export type AdCardType = {
  id?: string;
  link: string;
  imgUrl: string;
};

export type AdFloatType = {
  id?: string;
  position: "left" | "right";
  link: string;
  imgUrl: string;
};
