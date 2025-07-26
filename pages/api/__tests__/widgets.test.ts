import handler from '../widgets';
import { createMocks } from 'node-mocks-http';

describe('/api/widgets handler', () => {
  it('should return an empty list of widgets initially', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(Array.isArray(json)).toBe(true);
  });

  it('should store a widget on POST', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { id: 'widget-abc', text: 'Test widget' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(json).toEqual({ success: true });
  });

  it('should delete a widget on DELETE', async () => {
    const post = createMocks({
      method: 'POST',
      body: { id: 'widget-delete', text: 'To be deleted' },
    });
    await handler(post.req, post.res);

    const deleteMock = createMocks({
      method: 'DELETE',
      body: { id: 'widget-delete' },
    });
    await handler(deleteMock.req, deleteMock.res);

    expect(deleteMock.res._getStatusCode()).toBe(200);
    const json = JSON.parse(deleteMock.res._getData());
    expect(json).toEqual({ success: true });
  });

  it('should return 400 if POST body is invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { text: 'Missing ID' },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  it('should return 400 if DELETE body is invalid', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: { wrongKey: 'oops' },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks({ method: 'PUT' });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
  });
});
