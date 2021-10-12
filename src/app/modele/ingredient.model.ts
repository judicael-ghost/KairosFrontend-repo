export class Ingredient {
  id?: any;
  nom_ingredient?: string;
  categorie?: any;
  unite?: any;
  quantite_stock?: string;
  alerte_quantite?: string;
  achat_lieu?: any;
  achat_quantite?: string;
  achat_prix_unitaire?: string;
  achat_montant?: string;
  mode?: string;
  date_ajoute?: string;
  image?: File;
  sortie_quantite?: string;
  don_quantite?: string;
  ingredient_marchers?: any[];
}

export class IngredientCrud {
  id?: any;
  nom_ingredient?: string;
  categorie!: string;
  unite!: string;
  quantite_stock?: string;
  achat_lieu!: string;
  image!: File;
}
