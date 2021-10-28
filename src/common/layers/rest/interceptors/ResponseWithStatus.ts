import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../../../swagger/types/Response';
import { SuccessOrErrorEnum } from '../../../swagger/types/SuccessOrErrorEnum';

@Injectable()
export class ResponseWithStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: Response<Record<string, any>> = {
          status: SuccessOrErrorEnum.Ok,
          payload: data,
        };

        return response;
      }),
    );
  }
}
