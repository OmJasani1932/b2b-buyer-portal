const FooterCopyrightText = ({ pageData }: any) => {
  return (
    <>
      {pageData?.globalSettings?.footer_com &&
        pageData?.globalSettings?.footer_com?.[0]?.copyright_text_et && (
          <div className="xl:w-4/12 w-full flex xl:justify-start justify-center">
            <p
              className="mb-0 lg:text-base text-sm text-center"
              dangerouslySetInnerHTML={{
                __html:
                  pageData?.globalSettings?.footer_com &&
                  pageData?.globalSettings?.footer_com[0]?.copyright_text_et,
              }}
            />
          </div>
        )}
    </>
  );
};

export default FooterCopyrightText;
