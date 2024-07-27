import { Request, Response } from 'express';
import { planets } from '../dummyDatabase'; 

let planetsDb = planets;

export const getAll = (req: Request, res: Response) => {
    res.json(planetsDb);
};

export const getOneById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id, 10);
    const planet = planetsDb.find(p => p.id === planetId);
    if (planet) {
        res.json(planet);
    } else {
        res.status(404).json({ message: 'Planet not found' });
    }
};

export const create = (req: Request, res: Response) => {
    const newPlanet = { id: planetsDb.length + 1, ...req.body };
    planetsDb = [...planetsDb, newPlanet];
    res.status(201).json(newPlanet);
};

export const updateById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id, 10);
    let updatedPlanet;
    planetsDb = planetsDb.map(p => {
        if (p.id === planetId) {
            updatedPlanet = { ...p, ...req.body };
            return updatedPlanet;
        }
        return p;
    });
    if (updatedPlanet) {
        res.json(updatedPlanet);
    } else {
        res.status(404).json({ message: 'Planet not found' });
    }
};

export const deleteById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id, 10);
    const initialLength = planetsDb.length;
    planetsDb = planetsDb.filter(p => p.id !== planetId);
    if (planetsDb.length < initialLength) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Planet not found' });
    }
};



//


import { Router } from 'express';
import { getAll, getOneById, create, updateById, deleteById } from '../controllers/planets';

const router = Router();

router.get('/api/planets', getAll);
router.get('/api/planets/:id', getOneById);
router.post('/api/planets', create);
router.put('/api/planets/:id', updateById);
router.delete('/api/planets/:id', deleteById);

export default router;