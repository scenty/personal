import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { profile } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  const links = [
    { label: '知乎', labelEn: 'Zhihu', url: profile.social.zhihu },
    { label: 'ResearchGate', labelEn: 'ResearchGate', url: profile.social.researchGate },
    { label: 'ORCID', labelEn: 'ORCID', url: profile.social.orcid },
    { label: 'Google Scholar', labelEn: 'Google Scholar', url: profile.social.scholar },
    { label: '海科院主页', labelEn: 'SYSU Profile', url: profile.social.sysu },
  ];

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${profile.contact.email}`} className="hover:text-primary transition-colors">
                  {profile.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{profile.contact.phone}</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  {language === 'zh' ? profile.contact.address : profile.contact.addressEn}
                  <br />
                  {t('footer.postcode')}: {profile.contact.postcode}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>{language === 'zh' ? link.label : link.labelEn}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.institution')}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">
                {language === 'zh' ? profile.institution : profile.institutionEn}
              </p>
              <p>{language === 'zh' ? profile.department : profile.departmentEn}</p>
              <p>{language === 'zh' ? profile.team : profile.teamEn}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {language === 'zh' ? profile.name : profile.nameEn} |{' '}
            {language === 'zh' ? profile.institution : profile.institutionEn}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
