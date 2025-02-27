import { Fragment } from 'react';
import { IconFacebook } from '../assets/icons/facebook';
import { IconTiktok } from '../assets/icons/icon-tiktok';
import { IconYoutube } from '../assets/icons/icon-youtube';
import { IconInsta } from '../assets/icons/insta';
import { IconLinkedin } from '../assets/icons/linkedin';
import { IconPinterest } from '../assets/icons/pintrest';
import { IconTwitter } from '../assets/icons/twitter';
import { ExpLinkParser } from '../utils';

interface SocialIconsProps {
  pageData: {
    globalSettings: {
      social_links_com: any[];
      footer_com: any[];
    };
  };
}

const socialList = [
  {
    socialMedia: 'Linkedin',
    socialLink: 'linkedin_link_et',
    icons: IconLinkedin,
  },
  {
    socialMedia: 'youtube',
    socialLink: 'youtube_link_et',
    icons: IconYoutube,
  },
  {
    socialMedia: 'Facebook',
    socialLink: 'facebook_link_et',
    icons: IconFacebook,
  },
  {
    socialMedia: 'Twitter',
    socialLink: 'twitter_link_et',
    icons: IconTwitter,
  },
  {
    socialMedia: 'Instagram',
    socialLink: 'instagram_link_et',
    icons: IconInsta,
  },
  {
    socialMedia: 'Pinterest',
    socialLink: 'pinterest_link_et',
    icons: IconPinterest,
  },
  {
    socialMedia: 'TickTock',
    socialLink: 'tiktok_link_et',
    icons: IconTiktok,
  },
];

const SocialIcons = ({ pageData }: SocialIconsProps) => {
  return (
    <>
      {pageData?.globalSettings?.social_links_com?.length &&
        (pageData?.globalSettings?.social_links_com?.[0]?.facebook_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.instagram_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.pinterest_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.tiktok_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.linkedin_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.twitter_link_et ||
          pageData?.globalSettings?.social_links_com?.[0]?.youtube_link_et) && (
          <div className="footer-col xl:basis-[25.3%] basis-[100%]">
            {pageData?.globalSettings?.footer_com &&
              pageData?.globalSettings?.footer_com?.[0]?.social_links_heading_et && (
                <h6 className="text-white mb-3.5">
                  {pageData?.globalSettings?.footer_com &&
                    pageData?.globalSettings?.footer_com?.[0]?.social_links_heading_et}
                </h6>
              )}
            <ul className="flex gap-7 justify-start xl:mt-0 mt-6">
              {socialList.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {pageData.globalSettings?.social_links_com?.length &&
                      pageData.globalSettings?.social_links_com[0][item.socialLink] && (
                        <li className="flex">
                          <ExpLinkParser
                            title={`${item.socialMedia}`}
                            aria-label={`${item.socialMedia}`}
                            to={`${
                              pageData.globalSettings?.social_links_com?.length &&
                              pageData.globalSettings?.social_links_com[0][item.socialLink]
                            }`}
                            target="_blank"
                            className="icon text-white hover:text-primaryHover"
                          >
                            <i className="icon w-8 h-8 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">
                              <item.icons />
                            </i>
                          </ExpLinkParser>
                        </li>
                      )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        )}
    </>
  );
};

export default SocialIcons;
