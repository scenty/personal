import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface Slide {
  id: number;
  image: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'images/hero-ocean.jpg',
    title: '探索海洋奥秘',
    titleEn: 'Explore Ocean Mysteries',
    subtitle: '人工智能驱动的海洋科学研究',
    subtitleEn: 'AI-Driven Ocean Science Research',
    cta: '了解更多',
    ctaLink: '/publications'
  },
  {
    id: 2,
    image: 'images/hero-satellite.jpg',
    title: '遥感海洋监测',
    titleEn: 'Remote Sensing Ocean Monitoring',
    subtitle: '卫星数据揭示海洋变化规律',
    subtitleEn: 'Satellite Data Reveals Ocean Patterns',
    cta: '查看数据产品',
    ctaLink: '/data-products'
  },
  {
    id: 3,
    image: 'images/hero-research.jpg',
    title: '海洋数值模拟',
    titleEn: 'Ocean Numerical Modeling',
    subtitle: '计算海洋科学与海洋模型研究',
    subtitleEn: 'Computational Ocean Science & Modeling',
    cta: '查看科研项目',
    ctaLink: '/projects'
  },
  {
    id: 4,
    image: 'images/hero-ai.jpg',
    title: '智能海洋预报',
    titleEn: 'Intelligent Ocean Forecasting',
    subtitle: '深度学习赋能海洋环境预测',
    subtitleEn: 'Deep Learning for Marine Environment Prediction',
    cta: '加入团队',
    ctaLink: '/contact'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language } = useLanguage();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight animate-fade-in-up">
                {language === 'zh' ? slide.title : slide.titleEn || slide.title}
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
                {language === 'zh' ? slide.subtitle : slide.subtitleEn || slide.subtitle}
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 animate-fade-in-up animation-delay-400"
              >
                <Link to={slide.ctaLink}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all z-10"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-1 rounded-full overflow-hidden transition-all duration-300 ${
              index === currentSlide ? 'w-16 bg-white/30' : 'w-8 bg-white/20 hover:bg-white/30'
            }`}
          >
            {index === currentSlide && (
              <div 
                className="absolute inset-0 bg-white origin-left animate-progress"
                style={{ animationDuration: '5s' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-mono z-10">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default HeroCarousel;
