import type { NextApiRequest, NextApiResponse } from 'next';
import { listWidgets, createOrUpdateWidget, removeWidget } from '@/lib/widgets/widgetService';
import type { Widget } from '@/types/widget';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log(`[API] ${request.method} /api/widgets`);

  if (request.method === 'GET') {
    const widgets: Widget[] = listWidgets();
    console.log(`[API] Responding with ${widgets.length} widgets`);
    return response.status(200).json(widgets);
  }

  if (request.method === 'POST') {
    const { id, text } = request.body;
    console.log(`[API] POST body →`, request.body);

    if (!id || typeof text !== 'string') {
      console.warn(`[API] 400 Invalid payload`);
      return response.status(400).json({ error: 'Invalid widget data.' });
    }

    createOrUpdateWidget(id, text);
    console.log(`[API] Widget stored → ID: ${id}`);
    return response.status(200).json({ success: true });
  }

  if (request.method === 'DELETE') {
    const { id } = request.body;
    console.log(`[API] DELETE body →`, request.body);

    if (!id || typeof id !== 'string') {
      console.warn(`[API] 400 Invalid delete payload`);
      return response.status(400).json({ error: 'Invalid widget ID for deletion.' });
    }

    removeWidget(id);
    console.log(`[API] Widget deleted → ID: ${id}`);
    return response.status(200).json({ success: true });
  }

  console.warn(`[API] 405 Method Not Allowed: ${request.method}`);
  return response.status(405).end();
}
