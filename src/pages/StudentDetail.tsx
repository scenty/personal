import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Mail, BookOpen, Award, Building2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getStudentById, allStudents, publications } from '@/data';

// 从学生的英文名中提取姓氏和名字首字母
const getStudentNameInitials = (nameEn: string | undefined): { surname: string; firstNameInitial: string } | null => {
  if (!nameEn) return null;
  const parts = nameEn.trim().split(/\s+/);
  if (parts.length < 2) return null;
  // 英文名格式通常是 "FirstName LastName"，最后一部分是姓氏
  const surname = parts[parts.length - 1];
  const firstNameInitial = parts[0].charAt(0).toUpperCase();
  return { surname, firstNameInitial };
};

// 检查第一作者是否匹配学生（匹配姓氏和名字首字母）
const matchFirstAuthorToStudent = (firstAuthor: string, student: typeof allStudents[0]): boolean => {
  const studentInitials = getStudentNameInitials(student.nameEn);
  if (!studentInitials) return false;
  
  // 第一作者通常是姓氏，如 "He", "Yang", "Wang"
  const firstAuthorSurname = firstAuthor.trim();
  
  // 匹配姓氏（不区分大小写）
  if (firstAuthorSurname.toLowerCase() !== studentInitials.surname.toLowerCase()) {
    return false;
  }
  
  // 如果论文中有名字首字母（如 "He, J."），也检查名字首字母
  // 否则只匹配姓氏即可
  return true;
};

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
                      {student.publications.map((pub, idx) => {
                        // 尝试匹配论文并添加链接
                        // 匹配格式: "He et al. (2026) Ocean-Land-Atmosphere Research" 或 "Yang et al. (2024) Science of The Total Environment"
                        const match = pub.match(/(.+?)\s*\((\d{4})\)\s*(.+)/);
                        if (match) {
                          const [, authors, year, journal] = match;
                          const yearNum = parseInt(year);
                          const journalName = journal.trim();
                          // 提取第一作者（如 "He et al." -> "He"）
                          const firstAuthor = authors.trim().split(/\s+/)[0].replace(',', '').replace('.', '');
                          
                          // 首先检查第一作者是否匹配当前学生
                          const isFirstAuthorMatch = matchFirstAuthorToStudent(firstAuthor, student);
                          
                          if (isFirstAuthorMatch) {
                            // 如果第一作者匹配，在所有论文中查找匹配的论文
                            const matchedPub = publications.find(p => {
                              // 1. 年份必须匹配
                              if (p.year !== yearNum) return false;
                              
                              // 2. 期刊名称匹配：使用更宽松的匹配方式
                              const journalLower = p.journal.toLowerCase();
                              const journalNameLower = journalName.toLowerCase();
                              // 提取期刊的关键部分进行匹配（去掉 "IEEE Transactions on" 等前缀）
                              const journalKey = journalNameLower.replace(/^(ieee transactions on |journal of |acta )/i, '');
                              const pubJournalKey = journalLower.replace(/^(ieee transactions on |journal of |acta )/i, '');
                              const journalMatch = 
                                journalLower.includes(journalNameLower) || 
                                journalNameLower.includes(journalLower) ||
                                journalKey && pubJournalKey && (journalKey.includes(pubJournalKey) || pubJournalKey.includes(journalKey));
                              
                              if (!journalMatch) return false;
                              
                              // 3. 检查论文的第一作者是否匹配
                              let pubFirstAuthorSurname = '';
                              
                              // 优先使用 authorsEn
                              if (p.authorsEn) {
                                const pubFirstAuthor = p.authorsEn.split(',')[0].trim();
                                pubFirstAuthorSurname = pubFirstAuthor.split(/\s+/)[0];
                              } 
                              // 如果有 authors 字段
                              else if (p.authors) {
                                // 先检查是否包含学生中文名（中文格式）
                                if (p.authors.includes(student.name)) {
                                  return true;
                                }
                                
                                // 否则按英文格式解析
                                const firstPart = p.authors.split(',')[0].trim();
                                // 检查是否是英文格式（以英文字母开头）
                                if (/^[A-Za-z]/.test(firstPart)) {
                                  pubFirstAuthorSurname = firstPart.split(/\s+/)[0];
                                } else {
                                  return false;
                                }
                              } else {
                                return false;
                              }
                              
                              // 匹配姓氏（不区分大小写）
                              if (pubFirstAuthorSurname) {
                                const authorMatch = pubFirstAuthorSurname.toLowerCase() === firstAuthor.toLowerCase();
                                return authorMatch;
                              }
                              
                              return false;
                            });
                            
                            // 如果找到匹配的论文，链接到 publications 详情页
                            if (matchedPub && matchedPub.id) {
                              return (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <Link
                                    to={`/publications/${matchedPub.id}`}
                                    className="text-muted-foreground hover:text-primary hover:underline flex items-center gap-1"
                                  >
                                    {pub}
                                    <ExternalLink className="w-3 h-3" />
                                  </Link>
                                </li>
                              );
                            }
                          }
                        }
                        
                        // 如果没有匹配到，显示普通文本
                        return (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{pub}</span>
                          </li>
                        );
                      })}
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
