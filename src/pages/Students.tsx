import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Award, ArrowRight, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fzuStudents, sysuStudents, allStudents, studentsByDegree } from '@/data';

const Students = () => {
  const StudentCard = ({ student }: { student: typeof allStudents[0] }) => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold">
            {student.name.charAt(0)}
          </div>
          <Badge variant={student.institution === 'fzu' ? 'default' : 'secondary'}>
            {student.institutionName}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-1">{student.name}</h3>
        {student.nameEn && (
          <p className="text-sm text-muted-foreground mb-3">{student.nameEn}</p>
        )}
        
        <div className="space-y-2 mb-4">
          {student.degree && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span>{student.degree}</span>
            </div>
          )}
          {student.researchTopic && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{student.researchTopic}</span>
            </div>
          )}
        </div>

        {student.publications && student.publications.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">代表性成果</p>
            {student.publications.map((pub, idx) => (
              <p key={idx} className="text-sm text-foreground">{pub}</p>
            ))}
          </div>
        )}

        {student.awards && student.awards.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-sm">
              <Award className="w-4 h-4 text-yellow-500" />
              {student.awards.map((award, idx) => (
                <span key={idx} className="text-yellow-700 text-xs">{award}</span>
              ))}
            </div>
          </div>
        )}

        <Button asChild variant="outline" className="w-full mt-2">
          <Link to={`/students/${student.id}`}>
            查看详情 <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">学生团队</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            指导的学生获国家奖学金、校级优秀硕士学位论文、中山大学"博英汇学术沙龙"二等奖等奖励。
            欢迎海洋、环境、大气、地理等专业学生报考！
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{allStudents.length}</div>
              <div className="text-sm text-muted-foreground">指导学生总数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{fzuStudents.length}</div>
              <div className="text-sm text-muted-foreground">福州大学</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{sysuStudents.length}</div>
              <div className="text-sm text-muted-foreground">中山大学</div>
            </CardContent>
          </Card>
        </div>

        {/* Students Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">全部学生</TabsTrigger>
            <TabsTrigger value="graduate">研究生</TabsTrigger>
            <TabsTrigger value="undergraduate">本科生</TabsTrigger>
            <TabsTrigger value="sysu">中山大学</TabsTrigger>
            <TabsTrigger value="fzu">福州大学</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="graduate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentsByDegree.graduate.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="undergraduate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentsByDegree.undergraduate.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sysu">
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold">中山大学海洋科学学院</h3>
                      <p className="text-sm text-muted-foreground">计算海洋科学与海洋模型研究团队</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sysuStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fzu">
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-red-600" />
                    <div>
                      <h3 className="text-lg font-semibold">数字中国研究院（福建）</h3>
                      <p className="text-sm text-muted-foreground">外聘导师合作项目</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fzuStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recruitment */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
            <CardContent className="p-8 text-center">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-200" />
              <h2 className="text-2xl font-bold mb-4">欢迎报考</h2>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                欢迎海洋、环境、大气、地理等专业学生报考！加入我们，一起探索人工智能等前沿计算方法及其海洋应用！
              </p>
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                <Link to="/contact">联系我</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Students;
