import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { BarrierContext } from '../../interfaces';
import { IApiService } from '../../interfaces/services';

// Load environment variables
config();

export class ApiService implements IApiService {
    private app: express.Application;
    private server: any;
    private isServerRunning: boolean = false;

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

    private setupRoutes(): void {
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
