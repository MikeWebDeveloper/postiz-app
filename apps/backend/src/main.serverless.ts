import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

export async function createRequestHandler() {
  if (!app) {
    app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }

  return async function handler(req: Request) {
    try {
      const url = new URL(req.url);
      const method = req.method;
      const headers = Object.fromEntries(req.headers);
      const body = req.body ? await req.json() : undefined;

      const response = await app.getHttpAdapter().getInstance()(
        {
          method,
          url: url.pathname,
          headers,
          body,
        },
        {
          setHeader: () => {},
          end: () => {},
        }
      );

      return new Response(JSON.stringify(response.body), {
        status: response.statusCode,
        headers: response.headers,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
} 