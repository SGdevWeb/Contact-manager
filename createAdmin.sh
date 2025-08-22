#!/bin/bash

# Charger les variables du fichier .env
if [ -f .env ]; then
  set -a
  source .env
  set +a
else
  echo "❌ Fichier .env introuvable"
  exit 1
fi

# Demander le username
read -p "Nom d'utilisateur : " USERNAME

# Demander le mot de passe (masqué)
read -s -p "Mot de passe : " PASSWORD
echo ""
read -s -p "Confirmer le mot de passe : " PASSWORD_CONFIRM
echo ""

# Vérifier le mot de passe
if [ "$PASSWORD" != "$PASSWORD_CONFIRM" ]; then
  echo "❌ Les mots de passe ne correspondent pas."
  exit 1
fi

# Générer le hash bcrypt
HASH=$(node -e "console.log(require('bcrypt').hashSync(process.argv[1], 10))" "$PASSWORD")

# Vérifier que le hash est bien généré
if [ -z "$HASH" ]; then
  echo "❌ Erreur lors du hashage du mot de passe"
  exit 1
fi

# Insérer dans la base
mysql -u"$DB_USER" -p"$DB_PASSWORD" -h "$DB_HOST" "$DB_NAME" \
  -e "INSERT INTO admins (username, passwordHash) VALUES ('$USERNAME', '$HASH');"

if [ $? -eq 0 ]; then
  echo "✅ Admin $USERNAME créé avec succès"
else
  echo "❌ Erreur lors de l'insertion dans la base"
fi
