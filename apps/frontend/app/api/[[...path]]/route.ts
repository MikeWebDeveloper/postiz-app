import { createRequestHandler } from '@postiz/backend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handler = createRequestHandler();

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}

export async function PUT(req: Request) {
  return handler(req);
}

export async function DELETE(req: Request) {
  return handler(req);
}

export async function PATCH(req: Request) {
  return handler(req);
}

export async function OPTIONS(req: Request) {
  return handler(req);
} 