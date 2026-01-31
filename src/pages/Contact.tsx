import { Mail, Phone, MapPin, ExternalLink, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { profile } from '@/data';

const Contact = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">联系方式</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            欢迎海洋、环境、大气、地理等专业学生报考！加入我们，一起探索人工智能等前沿计算方法及其海洋应用！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> 电子邮箱
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`mailto:${profile.contact.email}`}
                  className="text-lg text-primary hover:underline flex items-center gap-2"
                >
                  {profile.contact.email}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" /> 办公电话
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{profile.contact.phone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> 办公地址
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{profile.contact.address}</p>
                <p className="text-muted-foreground">邮编: {profile.contact.postcode}</p>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>其他平台</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href={profile.social.zhihu}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div>
                    <p className="font-medium">知乎</p>
                    <p className="text-sm text-muted-foreground">海洋、海洋科学领域优秀回答者</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </a>
                <a 
                  href={profile.social.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div>
                    <p className="font-medium">ResearchGate</p>
                    <p className="text-sm text-muted-foreground">学术研究成果展示</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </a>
                <a 
                  href={profile.social.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div>
                    <p className="font-medium">ORCID</p>
                    <p className="text-sm text-muted-foreground">学术身份标识</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Institution Info */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle>所属机构</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge className="mb-2">主要单位</Badge>
                  <h3 className="text-xl font-bold">{profile.institution}</h3>
                  <p className="text-muted-foreground">{profile.department}</p>
                  <p className="text-muted-foreground">{profile.team}</p>
                  <p className="text-sm text-muted-foreground mt-1">{profile.position}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> 招生信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">欢迎报考专业</h4>
                  <div className="flex flex-wrap gap-2">
                    {["海洋科学", "环境科学", "大气科学", "地理信息"].map((major) => (
                      <Badge key={major} variant="outline">{major}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">研究方向</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {profile.researchInterests.map((interest, idx) => (
                      <li key={idx}>• {interest}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recruitment CTA */}
            <Card className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-xl font-bold mb-2">加入我们</h3>
                <p className="text-blue-100 text-sm mb-4">
                  一起探索人工智能等前沿计算方法及其海洋应用
                </p>
                <Button asChild className="bg-white text-blue-900 hover:bg-blue-50">
                  <a href={`mailto:${profile.contact.email}`}>
                    <Mail className="mr-2 w-4 h-4" /> 发送邮件
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
