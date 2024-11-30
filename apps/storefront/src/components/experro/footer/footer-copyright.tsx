import FooterCopyrightText from './footer-copyright-text';
import FooterSupportedPayments from './footer-supported-payments';

const FooterCopyright = ({ pageData }: any) => {
  return (
    <div className="footer-copyright-section">
      <div className="container">
        <div className="footer-copyright-section-inner">
          <div className="row align-center">
            <FooterCopyrightText pageData={pageData} />
            <FooterSupportedPayments pageData={pageData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
