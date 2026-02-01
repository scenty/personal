import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Mail, BookOpen, Award, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getStudentById, allStudents } from '@/data';

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const student = id ? getStudentById(id) : undefined;

  if (!student) {
    return <Navigate to="/students" replace />;
  }

  // 获取同校的其他学生
  const relatedStudents = allStudents
    .filter(s => s.id !== student.id && s.institution === student.institution)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/students">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回研究生列表
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{student.name}</h1>
                      <Badge variant={student.institution === 'fzu' ? 'default' : 'secondary'}>
                        {student.institutionName}
                      </Badge>
                    </div>
                    {student.nameEn && (
                      <p className="text-lg text-muted-foreground mb-3">{student.nameEn}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                      {student.degree && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <GraduationCap className="w-4 h-4" />
                          <span>{student.degree}</span>
                        </div>
                      )}
                      {student.status && (
                        <Badge variant="outline">
                          {student.status === 'current' ? '在读' : '已毕业'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Research Topic */}
                {student.researchTopic && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" /> 研究方向
                    </h2>
                    <p className="text-muted-foreground">{student.researchTopic}</p>
                  </div>
                )}

                {/* Bio */}
                {student.bio && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">个人简介</h2>
                    <p className="text-muted-foreground leading-relaxed">{student.bio}</p>
                  </div>
                )}

                {/* Publications */}
                {student.publications && student.publications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" /> 代表性成果
                    </h2>
                    <ul className="space-y-2">
                      {student.publications.map((pub, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{pub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Awards */}
                {student.awards && student.awards.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" /> 获奖情况
                    </h2>
                    <ul className="space-y-2">
                      {student.awards.map((award, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">★</span>
                          <span className="text-muted-foreground">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Institution Info */}
            <Card>
              <CardHeader>
                <CardTitle>所属机构</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">{student.institutionName}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.institution === 'sysu' ? '海洋科学学院' : '数字中国研究院（福建）'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            {student.email && (
              <Card>
                <CardHeader>
                  <CardTitle>联系方式</CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`mailto:${student.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" /> {student.email}
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Related Students */}
            {relatedStudents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>同校学生</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedStudents.map((s) => (
                    <div key={s.id} className="border-b last:border-0 pb-3 last:pb-0">
                      <Link to={`/students/${s.id}`} className="hover:text-primary transition-colors">
                        <p className="font-medium">{s.name}</p>
                      </Link>
                      <p className="text-sm text-muted-foreground">{s.degree} | {s.researchTopic}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
