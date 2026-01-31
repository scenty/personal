import { FolderGit2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects, projectsByStatus, projectsByRole } from '@/data';

const Projects = () => {
  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={project.status === 'ongoing' ? 'default' : 'secondary'}>
                {project.status === 'ongoing' ? '进行中' : '已完成'}
              </Badge>
              <Badge variant="outline">{project.role}</Badge>
            </div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <FolderGit2 className="w-4 h-4" />
          <span>{project.fundingSource}</span>
        </div>
        {project.duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
        )}
        {project.description && (
          <p className="text-sm text-muted-foreground mt-3">{project.description}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">科研项目</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            主持国家自然基金青年基金、重点研发子任务、中国博士后基金、广东省/福建省科技厅自然基金、
            南海所开放课题等科研项目。
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-muted-foreground">项目总数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projectsByStatus.ongoing.length}</div>
              <div className="text-sm text-muted-foreground">进行中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projectsByStatus.completed.length}</div>
              <div className="text-sm text-muted-foreground">已完成</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projectsByRole.leader.length}</div>
              <div className="text-sm text-muted-foreground">主持项目</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">全部项目</TabsTrigger>
            <TabsTrigger value="ongoing">进行中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="leader">主持项目</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ongoing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsByStatus.ongoing.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsByStatus.completed.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leader">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsByRole.leader.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Funding Sources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">资助机构</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "国家自然科学基金",
              "科技部重点研发计划",
              "广东省科技厅",
              "福建省科技厅",
              "中国博士后基金",
              "中央高校基本科研业务费",
              "厦门大学MEL",
              "南海所开放课题"
            ].map((source, idx) => (
              <Card key={idx} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="font-medium text-sm">{source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
