import { Link } from 'react-router-dom';
import { FolderGit2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects, projectsByStatus, projectsByRole, getPublicationById } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Projects = () => {
  const { language, t } = useLanguage();

  const fundingOrgs = language === 'zh'
    ? [
        "国家自然科学基金",
        "科技部重点研发计划",
        "广东省科技厅",
        "福建省科技厅",
        "中国博士后基金",
        "中央高校基本科研业务费",
        "厦门大学MEL",
        "南海所开放课题"
      ]
    : [
        "NSFC",
        "National Key R&D Program",
        "Guangdong Science & Technology",
        "Fujian Science & Technology",
        "China Postdoctoral Science Foundation",
        "Central Universities Fund",
        "XMU MEL",
        "SCSIO Open Fund"
      ];

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={project.status === 'ongoing' ? 'default' : 'secondary'}>
                {project.status === 'ongoing' ? t('projects.statusOngoing') : t('projects.statusCompleted')}
              </Badge>
              <Badge variant="outline">
                {project.role === '主持' ? t('projects.rolePI') : (language === 'en' && project.roleEn ? project.roleEn : project.role)}
              </Badge>
            </div>
            <CardTitle className="text-lg">
              {language === 'en' && project.titleEn ? project.titleEn : project.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <FolderGit2 className="w-4 h-4" />
          <span>
            {language === 'en' && project.fundingSourceEn ? project.fundingSourceEn : project.fundingSource}
          </span>
        </div>
        {project.duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
        )}
        {project.amount && (
          <p className="text-sm text-muted-foreground mb-2">{project.amount}</p>
        )}
        {(project.description || project.descriptionEn) && (
          <p className="text-sm text-muted-foreground mt-3">
            {language === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
          </p>
        )}
        {project.relatedPublicationIds && project.relatedPublicationIds.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <p className="text-xs font-medium mb-2">{t('projects.relatedPubs')}</p>
            <ul className="space-y-1">
              {project.relatedPublicationIds.map((pubId) => {
                const pub = getPublicationById(pubId);
                if (!pub) return null;
                return (
                  <li key={pubId}>
                    <Link
                      to={`/publications/${pubId}`}
                      className="text-xs text-primary hover:underline line-clamp-1"
                    >
                      {pub.year} · {pub.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('projects.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('projects.pageDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-muted-foreground">{t('projects.total')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projectsByStatus.ongoing.length}</div>
              <div className="text-sm text-muted-foreground">{t('projects.ongoing')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projectsByStatus.completed.length}</div>
              <div className="text-sm text-muted-foreground">{t('projects.completed')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{projectsByRole.leader.length}</div>
              <div className="text-sm text-muted-foreground">{t('projects.leader')}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">{t('projects.all')}</TabsTrigger>
            <TabsTrigger value="ongoing">{t('projects.ongoing')}</TabsTrigger>
            <TabsTrigger value="completed">{t('projects.completed')}</TabsTrigger>
            <TabsTrigger value="leader">{t('projects.leader')}</TabsTrigger>
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

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('projects.fundingOrgs')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fundingOrgs.map((source, idx) => (
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
