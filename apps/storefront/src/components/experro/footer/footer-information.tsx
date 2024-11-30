const FooterInformation = ({ pageData }: any) => {

  return (
    <div className="footer-information">
      {(pageData.globalSettings?.footer_com &&
        pageData.globalSettings?.footer_com[0]?.column_4_title_et) &&
        (
          <h6 className="footer-title">
            {pageData.globalSettings?.footer_com &&
              pageData.globalSettings?.footer_com[0]?.column_4_title_et}
          </h6>
        )
      }
      <div className="footer-contact-info">
        {(pageData.globalSettings?.site_com?.length &&
          pageData.globalSettings?.site_com[0].address_et) &&
          (
            <div className="info-item footer-address">
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.globalSettings?.site_com?.length &&
                    pageData.globalSettings?.site_com[0].address_et,
                }}
              />
            </div>
          )
        }
        {(pageData?.globalSettings?.site_com &&
          pageData?.globalSettings?.site_com?.[0].phone_et) &&
          (
            <div className="info-item footer-call">
              <a
                href={`tel:${pageData.globalSettings?.site_com?.length &&
                  pageData.globalSettings?.site_com[0].phone_et
                  }`}
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.globalSettings?.site_com?.length &&
                    pageData.globalSettings?.site_com[0].phone_et,
                }}
              />
            </div>
          )
        }
        {
          (pageData.globalSettings?.site_com?.length &&
            pageData.globalSettings?.site_com[0].email_et) && (
            <div className="info-item">
              <a
                href={`mailto:${pageData.globalSettings?.site_com?.length &&
                  pageData.globalSettings?.site_com[0].email_et
                  }`}
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.globalSettings?.site_com?.length &&
                    pageData.globalSettings?.site_com[0].email_et,
                }}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default FooterInformation;
