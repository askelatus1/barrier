import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { BarrierContext } from '../../interfaces';
import { IApiService, ServerSentEvent } from '../../interfaces/services';
import { TrackEventType } from '../../dict/constants';
import { TrackResponse } from '../../interfaces/track';

// Load environment variables
config();

export class ApiService implements IApiService {
    private app: express.Application;
    private server: any;
    private isServerRunning: boolean = false;
    private eventSubscribers: Set<express.Response> = new Set();

    constructor(private ctx: BarrierContext) {
        this.ctx.apiService = this;
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    /**
     * Отправляет событие всем подписчикам
     * @param event Событие для отправки
     */
    public broadcastEvent(event: ServerSentEvent): void {
        const eventString = `data: ${JSON.stringify(event)}\n\n`;
        
        this.eventSubscribers.forEach(client => {
            try {
                client.write(eventString);
            } catch (error) {
                console.error('Error sending SSE:', error);
                this.eventSubscribers.delete(client);
            }
        });
    }

    private setupRoutes(): void {
        // SSE endpoint for application events
        this.app.get('/api/events/stream', (req, res) => {
            console.log('New SSE connection request');
            
            // Настройка SSE соединения
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            });
            res.write('\n');

            // Добавляем клиента в список подписчиков
            this.eventSubscribers.add(res);
            console.log(`New SSE client connected. Total subscribers: ${this.eventSubscribers.size}`);

            // Отправляем начальное сообщение
            this.broadcastEvent({
                type: 'connection_established',
                data: {
                    message: 'Connected to event stream'
                }
            });

            // Обработка закрытия соединения
            req.on('close', () => {
                this.eventSubscribers.delete(res);
                console.log(`SSE client disconnected. Remaining subscribers: ${this.eventSubscribers.size}`);
            });
        });

        // Actors endpoints
        this.app.get('/api/actors', (req, res) => {
            const actors = this.ctx.actorEngine.getActorsAll();
            res.json(actors);
        });

        this.app.get('/api/actors/:id', (req, res) => {
            const { id } = req.params;
            const actor = this.ctx.actorEngine.getActorById(id);
            if (!actor) {
                res.status(404).json({ error: `Actor with id ${id} not found` });
                return;
            }
            res.json(actor);
        });

        // Regions endpoints
        this.app.get('/api/regions', (req, res) => {
            const regions = this.ctx.regionService.getRegionsAll();
            res.json(regions);
        });

        this.app.get('/api/regions/:id', (req, res) => {
            const { id } = req.params;
            const region = this.ctx.regionService.getRegionById(id);
            if (!region) {
                res.status(404).json({ error: `Region with id ${id} not found` });
                return;
            }
            res.json(region);
        });

        this.app.get('/api/regions/:id/neighbours', (req, res) => {
            const { id } = req.params;
            const region = this.ctx.regionService.getRegionById(id);
            if (!region) {
                res.status(404).json({ error: `Region with id ${id} not found` });
                return;
            }
            const neighbours = this.ctx.regionService.getNeighbourRegions(id);
            res.json(neighbours);
        });

        // Zones endpoints
        this.app.get('/api/zones', (req, res) => {
            const actors = this.ctx.actorEngine.getActorsAll();
            const zones = actors.map(actor => this.ctx.actorZoneService.getZoneByFactionId(actor.id)).filter(Boolean);
            res.json(zones);
        });

        this.app.get('/api/zones/:factionId', (req, res) => {
            const { factionId } = req.params;
            const zone = this.ctx.actorZoneService.getZoneByFactionId(factionId);
            if (!zone) {
                res.status(404).json({ error: `Zone for faction ${factionId} not found` });
                return;
            }
            res.json(zone);
        });

        this.app.get('/api/zones/:factionId/regions', (req, res) => {
            const { factionId } = req.params;
            const zone = this.ctx.actorZoneService.getZoneByFactionId(factionId);
            if (!zone) {
                res.status(404).json({ error: `Zone for faction ${factionId} not found` });
                return;
            }
            const regions = this.ctx.actorZoneService.getOwnRegions(zone);
            res.json(regions);
        });

        this.app.get('/api/zones/:factionId/neighbours', (req, res) => {
            const { factionId } = req.params;
            const zone = this.ctx.actorZoneService.getZoneByFactionId(factionId);
            if (!zone) {
                res.status(404).json({ error: `Zone for faction ${factionId} not found` });
                return;
            }
            const neighbours = this.ctx.actorZoneService.getNeighbourRegions(zone);
            res.json(neighbours);
        });

        // Events endpoints
        this.app.get('/api/events', (req, res) => {
            const events = this.ctx.eventEngine.getAllEvents();
            res.json(events);
        });

        this.app.get('/api/events/:id', (req, res) => {
            const { id } = req.params;
            const event = this.ctx.eventEngine.getEventById(id);
            if (!event) {
                res.status(404).json({ error: `Event with id ${id} not found` });
                return;
            }
            res.json(event);
        });

        // Tracks endpoints
        this.app.get('/api/tracks', (req, res) => {
            const tracks = this.ctx.tracker.getAllTracks();
            const trackResponses: TrackResponse[] = tracks.map(track => ({
                id: track.id,
                eventId: track.eventId,
                timeout: track.timeout,
                territoryId: track.territory?.id,
                actorIds: track.actors.map(actor => actor.id),
                status: track.status
            }));
            res.json(trackResponses);
        });

        this.app.get('/api/tracks/:trackId', (req, res) => {
            const { trackId } = req.params;
            const tracks = this.ctx.tracker.getAllTracks();
            const track = tracks.find(t => t.id === trackId);
            
            if (!track) {
                res.status(404).json({ error: `Track with id ${trackId} not found` });
                return;
            }

            const trackResponse: TrackResponse = {
                id: track.id,
                eventId: track.eventId,
                timeout: track.timeout,
                territoryId: track.territory?.id,
                actorIds: track.actors.map(actor => actor.id),
                status: track.status
            };
            res.json(trackResponse);
        });

        this.app.post('/api/tracks', (req, res) => {
            try {
                const { eventId, actorId } = req.body;

                if (!eventId || !actorId) {
                    res.status(400).json({ error: 'Event ID and Actor ID are required' });
                    return;
                }

                const actor = this.ctx.actorEngine.getActorById(actorId);
                if (!actor) {
                    res.status(404).json({ error: `Actor with id ${actorId} not found` });
                    return;
                }

                const event = this.ctx.eventEngine.getEventById(eventId);
                if (!event) {
                    res.status(404).json({ error: `Event with id ${eventId} not found` });
                    return;
                }

                this.ctx.eventEngine.createEventById(eventId, actor);
                this.broadcastEvent({
                    type: TrackEventType.CREATED,
                    data: { eventId, actorId }
                });
                res.status(201).json({ message: 'Track created successfully' });
            } catch (error) {
                console.error('Error creating track:', error);
                res.status(500).json({ error: 'Failed to create track' });
            }
        });

        this.app.delete('/api/tracks/:trackId', (req, res) => {
            try {
                const { trackId } = req.params;
                this.ctx.tracker.stopTrack(trackId);
                this.broadcastEvent({
                    type: TrackEventType.STOPPED,
                    data: { trackId }
                });
                res.status(200).json({ message: 'Track stopped successfully' });
            } catch (error) {
                console.error('Error stopping track:', error);
                res.status(500).json({ error: 'Failed to stop track' });
            }
        });

        // Error handling middleware
        this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong!' });
        });
    }

    async start(): Promise<void> {
        if (this.isServerRunning) {
            return;
        }

        const port = process.env.API_PORT || 3000;
        
        return new Promise((resolve) => {
            this.server = this.app.listen(port, () => {
                console.log(`API Server is running on port ${port}`);
                this.isServerRunning = true;
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        if (!this.isServerRunning) {
            return;
        }

        return new Promise((resolve, reject) => {
            this.server.close((err: Error) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.isServerRunning = false;
                console.log('API Server stopped');
                resolve();
            });
        });
    }

    isRunning(): boolean {
        return this.isServerRunning;
    }
}
