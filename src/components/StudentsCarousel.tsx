import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { allStudents } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const StudentsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { language } = useLanguage();

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {language === 'zh' ? '学生团队' : 'Student Team'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'zh' 
                ? `共指导 ${allStudents.length} 名学生` 
                : `Supervising ${allStudents.length} students`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`rounded-full w-12 h-12 transition-all ${
                canScrollLeft ? 'opacity-100 hover:bg-primary hover:text-white' : 'opacity-30'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`rounded-full w-12 h-12 transition-all ${
                canScrollRight ? 'opacity-100 hover:bg-primary hover:text-white' : 'opacity-30'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/students">
                {language === 'zh' ? '查看全部' : 'View All'} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Institution Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-blue-900">
                {language === 'zh' ? '中山大学' : 'SYSU'}
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-900">
              {allStudents.filter(s => s.institution === 'sysu').length}
            </p>
            <p className="text-sm text-blue-700">
              {language === 'zh' ? '名学生' : 'students'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-red-900">
                {language === 'zh' ? '福州大学' : 'FZU'}
              </span>
            </div>
            <p className="text-3xl font-bold text-red-900">
              {allStudents.filter(s => s.institution === 'fzu').length}
            </p>
            <p className="text-sm text-red-700">
              {language === 'zh' ? '名学生' : 'students'}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allStudents.map((student) => (
            <Card 
              key={student.id} 
              className="flex-shrink-0 w-[280px] snap-start hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <Link to={`/students/${student.id}`}>
                <CardContent className="p-6">
                  {/* Avatar & Institution */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <Badge variant={student.institution === 'fzu' ? 'default' : 'secondary'}>
                      {student.institutionName}
                    </Badge>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-1">{student.name}</h3>
                  {student.nameEn && (
                    <p className="text-sm text-muted-foreground mb-3">{student.nameEn}</p>
                  )}

                  {/* Info */}
                  <div className="space-y-2">
                    {student.degree && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{student.degree}</span>
                      </div>
                    )}
                    {student.researchTopic && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {language === 'zh' ? '研究方向：' : 'Research: '}
                        {student.researchTopic}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="mt-4 pt-4 border-t">
                    <Badge variant="outline" className="text-xs">
                      {student.status === 'current' 
                        ? (language === 'zh' ? '在读' : 'Current') 
                        : (language === 'zh' ? '已毕业' : 'Graduated')}
                    </Badge>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentsCarousel;
