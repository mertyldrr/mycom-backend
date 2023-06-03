import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  constructor(private readonly httpService: HttpService) {}
  newsAPIUrl = process.env.NEWS_API_URL;
  async getNews() {
    const { data } = await firstValueFrom(
      this.httpService.get(this.newsAPIUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data.articles;
  }
}
