import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Controller, Get, Inject, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NewsService } from './news.service';

@Controller()
export class NewsController {
  private readonly logger = new Logger(NewsService.name);
  constructor(
    private newsService: NewsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Get('news')
  async getNews(@Req() req: Request, @Res() res: Response) {
    const cacheKey = 'news';

    // Check if data is already cached
    const cachedNews = await this.cacheManager.get(cacheKey);

    if (cachedNews) {
      this.logger.log('news cached');
      // Data is found in the cache, return it
      return res.json(cachedNews);
    } else {
      const news = await this.newsService.getNews();
      if (news) {
        await this.cacheManager.set(
          'news',
          news,
          parseInt(process.env.CACHE_TTL_IN_MS),
        );
        return res.json(news);
      } else {
        res.status(400).json({ msg: 'News are not found' });
      }
    }
  }
}
