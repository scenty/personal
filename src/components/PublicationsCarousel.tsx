import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { publications } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const PublicationsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { t, language } = useLanguage();

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
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const latestPubs = [...publications].sort((a, b) => b.year - a.year).slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('publications.sectionTitle')}</h2>
            <p className="text-muted-foreground">
              {language === 'zh' ? '最新发表的学术论文' : 'Latest Published Papers'}
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
              <Link to="/publications">
                {t('publications.viewAll')} <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {latestPubs.map((pub) => (
            <Card 
              key={pub.id} 
              className="flex-shrink-0 w-[350px] md:w-[400px] snap-start hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <Link to={`/publications/${pub.id}`}>
                <CardContent className="p-6">
                  {/* Year & Tags */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-primary text-white">{pub.year}</Badge>
                    {pub.quartile && (
                      <Badge variant="outline">{pub.quartile}</Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3 line-clamp-3 group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3>

                  {/* Journal */}
                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    {pub.journal}
                  </p>

                  {/* Authors */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {pub.authors}
                  </p>

                  {/* Author Tags */}
                  <div className="flex gap-2">
                    {pub.isFirstAuthor && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {t('publications.firstAuthor')}
                      </span>
                    )}
                    {pub.isCorrespondingAuthor && !pub.isFirstAuthor && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {t('publications.correspondingAuthor')}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/publications">
              {t('publications.viewAll')} <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicationsCarousel;
