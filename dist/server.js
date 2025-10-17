"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const serveur = express();
const port = 3000;
serveur.use(bodyParser.json({ limit: "50mb" }));
serveur.use(bodyParser.text({ type: "text/plain", limit: "50mb" }));
const jetons = {};
const LIMITE_MOTS = 80000;
function getToday() {
    const d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
serveur.post("/api/token", (req, res) => {
    var _a;
    const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    if (!email)
        return res.status(400).send({ erreur: "Email manquant" });
    const jeton = Math.random().toString(36).substring(2);
    jetons[jeton] = { email, motsUtilises: {} };
    res.send({ jeton });
});
serveur.post("/api/justify", (req, res) => {
    const rawAuth = req.headers["authorization"];
    const auth = Array.isArray(rawAuth) ? rawAuth[0] : rawAuth;
    if (!auth)
        return res.status(401).send({ erreur: "Aucun jeton fourni" });
    const jeton = auth.replace("Bearer ", "").trim();
    if (!jetons[jeton])
        return res.status(401).send({ erreur: "Jeton invalide" });
    const texte = typeof req.body === "string" ? req.body : "";
    const mots = texte.split(/\s+/).filter((m) => m.length > 0);
    const nbMots = mots.length;
    const jour = getToday();
    if (!jetons[jeton].motsUtilises[jour])
        jetons[jeton].motsUtilises[jour] = 0;
    if (jetons[jeton].motsUtilises[jour] + nbMots > LIMITE_MOTS)
        return res.status(402).send({ erreur: "Limite quotidienne dépassée" });
    jetons[jeton].motsUtilises[jour] += nbMots;
    const largeur = 80;
    let ligne = "";
    let resultat = "";
    for (const mot of mots) {
        if ((ligne + " " + mot).trim().length <= largeur) {
            ligne += (ligne ? " " : "") + mot;
        }
        else {
            resultat += ligne + "\n";
            ligne = mot;
        }
    }
    if (ligne)
        resultat += ligne;
    res.type("text/plain").send(resultat);
});
serveur.get("/", (_req, res) => {
    res.send("Bienvenue sur l’API de justification !");
});
serveur.listen(port, () => console.log("Serveur démarré sur le port " + port));
//# sourceMappingURL=server.js.map