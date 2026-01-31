import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { profile } from '@/data';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">联系方式</h3>
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
                <span>{profile.contact.address}<br />邮编: {profile.contact.postcode}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">快速链接</h3>
            <div className="space-y-2">
              <a 
                href={profile.social.zhihu} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span>知乎</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={profile.social.researchGate} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span>ResearchGate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={profile.social.orcid} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span>ORCID</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Institution */}
          <div>
            <h3 className="font-semibold text-lg mb-4">所属机构</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{profile.institution}</p>
              <p>{profile.department}</p>
              <p>{profile.team}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name} | {profile.institution}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
