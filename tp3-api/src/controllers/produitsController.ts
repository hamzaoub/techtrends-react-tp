import type { Request, Response } from 'express';
import * as modele from '../models/produit.js';
import { validerProduit } from '../validation/produit.js';
import { avecCache, purgerCache } from '../cache.js';

export async function listeProduits(_req: Request, res: Response): Promise<void> {
  const resultat = await avecCache('produits', 60, modele.obtenirProduits);
  res.setHeader('X-Cache', resultat.cache);
  res.status(200).json(resultat.valeur);
}

export async function obtenirProduit(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ erreur: 'Id invalide' });
    return;
  }
  const produit = await modele.trouverProduit(id);
  if (produit === undefined) {
    res.status(404).json({ erreur: 'Produit introuvable' });
    return;
  }
  res.status(200).json(produit);
}

export async function creerProduit(req: Request<object, unknown, unknown>, res: Response): Promise<void> {
  const resultat = validerProduit(req.body);
  if (!resultat.valide) {
    res.status(400).json({ erreur: 'Donnees invalides', details: resultat.erreurs });
    return;
  }
  const produit = await modele.ajouterProduit(resultat.donnees);
  await purgerCache('produits');
  res.status(201).json(produit);
}

export async function mettreAJourProduit(req: Request<{ id: string }, unknown, unknown>, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ erreur: 'Id invalide' });
    return;
  }
  const resultat = validerProduit(req.body);
  if (!resultat.valide) {
    res.status(400).json({ erreur: 'Donnees invalides', details: resultat.erreurs });
    return;
  }
  const produit = await modele.remplacerProduit(id, resultat.donnees);
  if (produit === undefined) {
    res.status(404).json({ erreur: 'Produit introuvable' });
    return;
  }
  await purgerCache('produits');
  res.status(200).json(produit);
}

export async function supprimerProduit(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ erreur: 'Id invalide' });
    return;
  }
  const supprime = await modele.supprimerProduit(id);
  if (!supprime) {
    res.status(404).json({ erreur: 'Produit introuvable' });
    return;
  }
  await purgerCache('produits');
  res.status(204).end();
}
