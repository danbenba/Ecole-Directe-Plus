import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import CheckBox from "../../generic/UserInputs/CheckBox";
import InfoButton from "../../generic/Informative/InfoButton";
import SegmentedControl from "../../generic/UserInputs/SegmentedControl";
import DisplayThemeController from "../../generic/UserInputs/DisplayThemeController";
import NumberInput from "../../generic/UserInputs/NumberInput";
import Button from "../../generic/UserInputs/Button";
import KeyboardKey from "../../generic/KeyboardKey";
import StoreCallToAction from "../../generic/StoreCallToAction";

// graphics
import RefreshIcon from "../../graphics/RefreshIcon";

import { AppContext } from "../../../App";

import "./Settings.css";

export default function Settings({ usersSettings, globalSettings, accountsList }) {

    const { useUserSettings } = useContext(AppContext);

    const settings = useUserSettings();



    useEffect(() => {
        document.title = "Paramètres • Ecole Directe Plus";
    }, []);

    const handleGradeScaleEnableChange = () => {
        const newEnableValue = !settings.get("isGradeScaleEnabled");
        if (newEnableValue) {
            settings.set("gradeScale", settings.get("gradeScale") ? newEnableValue * settings.get("gradeScale") : newEnableValue * 20)
        }
        settings.set("isGradeScaleEnabled", newEnableValue)
    }

    const handleGradeScaleValueChange = (newValue) => {
        if (settings.get("gradeScale") !== newValue) {
            settings.set("isGradeScaleEnabled", !!parseInt(newValue));
        }
        settings.set("gradeScale", newValue);
    }

    useEffect(() => {
        console.log("useEffect", settings.get("gradeScale"))
    }, [settings.get("gradeScale")])

    return (
        <div id="settings">
            <div id="settings-box">
                <h1>Paramètres</h1>
                <div className="setting" id="keep-logged-in">
                    <CheckBox id="keep-logged-in-cb" checked={globalSettings.keepLoggedIn.value} onChange={(event) => globalSettings.keepLoggedIn.set(event.target.checked)} label={<span>Rester connecté</span>} />
                    <InfoButton className="setting-tooltip">Avertissement : cette fonctionnalité peut présenter des risques, notamment si vous êtes infecté par un logiciel malveillant (peut nécessiter une reconnexion)</InfoButton>
                </div>

                <div className="setting" id="display-theme">
                    <span>Thème d'affichage</span> <DisplayThemeController id="display-theme-sc" selected={settings.get("displayTheme")} onChange={(value) => { settings.set("displayTheme", value) }} fieldsetName="display-theme" />
                </div>

                <div className="setting" id="grade-scale">
                    <CheckBox id="grade-scale-cb" label={<span>Tous les barèmes sur</span>} checked={!!settings.get("isGradeScaleEnabled")} onChange={handleGradeScaleEnableChange} />
                    <NumberInput min={settings.object("gradeScale").min} max={settings.object("gradeScale").max} value={settings.get("gradeScale")} onChange={handleGradeScaleValueChange} active={settings.get("isGradeScaleEnabled")} />
                </div>

                <div className="setting" id="display-mode">
                    <span>Mode d'affichage</span>
                    <InfoButton className="setting-tooltip display-mode-ib">
                        <table id="demo-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="column-header">Qualité</th>
                                    <th className="column-header">Équilibré</th>
                                    <th className="column-header">Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="row-header">Coins arrondis</th>
                                    <td>Oui</td>
                                    <td>Oui</td>
                                    <td>Non</td>
                                </tr>

                                <tr>
                                    <th className="row-header">Ombres portées</th>
                                    <td>Oui</td>
                                    <td>Oui</td>
                                    <td>Non</td>
                                </tr>

                                <tr>
                                    <th className="row-header">Effets graphiques</th>
                                    <td>Oui</td>
                                    <td>Oui</td>
                                    <td>Non</td>
                                </tr>
                                <tr>
                                    <th className="row-header">Transitions</th>
                                    <td>Oui</td>
                                    <td>Non</td>
                                    <td>Non</td>
                                </tr>
                                <tr>
                                    <th className="row-header">Animations</th>
                                    <td>Oui</td>
                                    <td>Non</td>
                                    <td>Non</td>
                                </tr>
                            </tbody>
                        </table>
                    </InfoButton>
                    <SegmentedControl id="display-mode-sc" segments={settings.object("displayMode").values} displayedSegments={["Qualité", "Équilibré", "Performance"]} selected={settings.get("displayMode")} onChange={(value) => { settings.set("displayMode", value) }} fieldsetName="display-mode" />
                </div>

                <div className="setting disabled" id="luciole-font">
                    <CheckBox id="luciole-font-cb" checked={settings.get("lucioleFont")} onChange={(event) => { settings.set("lucioleFont", event.target.checked) }} label={<span>Police d'écriture optimisée pour les malvoyants (Luciole)</span>} />
                </div>

                <div className="setting" id="reset-windows-layouts">
                    <span>Réinitialiser l'agencement des fenêtres</span> <Button onClick={() => settings.set("windowArrangement", [])}>Réinitialiser</Button>
                </div>

                <div className="setting disabled" id="animate-windows">
                    <CheckBox id="animate-windows" label={<span>Animer l'apparition des fenêtres</span>} />
                </div>

                <div className="setting disabled" id="show-old-streak">
                    <CheckBox id="show-old-streak" label={<span>Afficher les Streak passées</span>} />
                </div>

                <div className="setting disabled" id="show-negative-badges">
                    <CheckBox id="show-negative-badges" label={<span>Afficher les Badges négatifs</span>} checked={settings.get("negativeBadges")} onChange={(event) => settings.set("negativeBadges", event.target.value)} />
                </div>

                {/* advanced settings */}
                <div id="advanced-settings">
                    <h2 className="heading">Paramètres avancés</h2>

                    <div className="setting disabled" id="dev-channel">
                        <CheckBox id="dev-channel-cb" label={<span>Basculer sur le canal développeur</span>} /> <InfoButton className="setting-tooltip">Profitez des dernières fonctionnalités en avant première. Avertissement : ce canal peut être instable et susceptible de dysfonctionner. Signalez nous quelconque problème à travers la page de retour</InfoButton> <Button onClick={() => location.reload()} title="Rafraîchir la page" className="refresh-button"><RefreshIcon /></Button>
                    </div>

                    <div className="setting" id="clear-local-storage">
                        <span>Nettoyer le localStorage et le sessionStorage</span> <InfoButton className="setting-tooltip">Efface toutes les données stockées sur votre appareil (action destructrice). Si vous rencontrez un problème, cela pourrait le résoudre. Il est recommandé de rafraichir la page (vous serez déconnecté)</InfoButton> <Button onClick={() => { localStorage.clear(); sessionStorage.clear() }}>Nettoyer</Button> <Button onClick={() => location.reload()} title="Rafraîchir la page" className="refresh-button"><RefreshIcon /></Button>
                    </div>

                    <div className="setting disabled" id="info-persistence">
                        <CheckBox id="info-persistence-cb" label={<span>Activer la persistance des informations sur tous vos appareils</span>} /> <InfoButton className="setting-tooltip">Nous utilisons les serveurs d'EcoleDirecte pour stocker vos informations de configuration. Ainsi, vos informations EDP vous suiveront sur tous vos appareils dès lors que vous serez connectés à ce même compte</InfoButton>
                    </div>

                    <div className="setting disabled" id="school-year">
                        <CheckBox id="school-year-cb" label={<span>Année scolaire (expérimental) </span>} checked={false} onChange={() => console.log("changed")} />
                        <InfoButton className="school-year">Expérimental : permet d'obtenir les informations des années scolaires précédentes. Nous tentons de reconstruire les données perdues mais ne garantissons pas la véracité totale des informations</InfoButton>
                        <NumberInput min={2021} max={(new Date()).getFullYear() + 1} />
                    </div>

                    {accountsList.length > 1 ? <div className="setting" id="sync-settings">
                        <CheckBox id="synchronise-settings" label={<span>Synchroniser les paramètres sur tous les profils</span>} checked={globalSettings.shareSettings.value} onChange={() => { globalSettings.shareSettings.set(!globalSettings.shareSettings.value) }} /> <InfoButton className="setting-tooltip">Les paramètres seront synchronisés avec ceux du profil actif</InfoButton>
                    </div> : null}


                    <div className="setting disabled" id="dynamic-loading">
                        <CheckBox id="dynamic-loading" label={<span>Activer le chargement dynamique</span>} /> <InfoButton className="setting-tooltip">Charge le contenu uniquement lorsque vous en avez besoin (recommandé pour les petits forfaits)</InfoButton>
                    </div>


                    <h2 className="heading">Raccourcis claviers</h2>

                    <div className="split-heading">
                        <hr />
                        <h3 className="heading">Navigation</h3>
                    </div>
                    <div className="shortcuts">
                        <div className="shortcut">
                            <span>Changer de page</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="ArrowLeft">←</KeyboardKey> / <KeyboardKey keyName="ArrowRight">→</KeyboardKey>
                            </div>
                        </div>
                        <div className="shortcut">
                            <span>Basculer sur la page #</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="NumLock">Num</KeyboardKey>
                            </div>
                        </div>
                        <div className="shortcut">
                            <span>Changer de compte</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="ArrowUp">↑</KeyboardKey> / <KeyboardKey keyName="ArrowDown">↓</KeyboardKey>
                            </div>
                        </div>
                        <div className="shortcut">
                            <span>Cibler le menu de navigation</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="ArrowUp">M</KeyboardKey>
                            </div>
                        </div>
                    </div>

                    <div className="split-heading">
                        <hr />
                        <h3 className="heading">Apparence</h3>
                    </div>
                    <div className="shortcuts">
                        <div className="shortcut">
                            <span>Alterner le thème</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="t">T</KeyboardKey>
                            </div>
                        </div>
                        <div className="shortcut">
                            <span>Alterner le mode d'affichage</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="d">D</KeyboardKey>
                            </div>
                        </div>
                    </div>

                    <div className="split-heading">
                        <hr />
                        <h3 className="heading">Personnalisation</h3>
                    </div>
                    <div className="shortcuts">
                        <div className="shortcut">
                            <span>Basculer en plein écran</span>
                            <div className="keys">
                                <KeyboardKey keyName="Control">Ctrl</KeyboardKey> <KeyboardKey keyName="Alt">Alt</KeyboardKey> <KeyboardKey keyName="f">F</KeyboardKey>
                            </div>
                        </div>
                        <div className="shortcut">
                            <span>Redimensionner la BottomSheet</span>
                            <div className="keys-container">
                                <div className="keys">
                                    <KeyboardKey keyName="PageUp">PageHaut</KeyboardKey> / <KeyboardKey keyName="PageDown">PageBas</KeyboardKey>
                                </div>
                                <div className="keys">
                                    <KeyboardKey keyName="ArrowUp">↑</KeyboardKey> / <KeyboardKey keyName="ArrowDown">↓</KeyboardKey>
                                </div>
                                <div className="keys">
                                    <KeyboardKey keyName="Home">Début</KeyboardKey> / <KeyboardKey keyName="End">Fin</KeyboardKey>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p id="important-note">Ces paramètres sont exclusifs {usersSettings.syncNomDeDossierTier ? (globalSettings.shareSettings.value ? "à l'appareil et au compte" : "à l'appareil, au compte et au profil") : (globalSettings.shareSettings.value ? "au compte" : "au compte et au profil")} que vous utilisez en ce moment</p>
                {/* Install as application (iOS/Android/Windows) */}
                <div className="setting" id="install-as-application-tutorials">
                    <StoreCallToAction companyLogoSRC="/images/apple-logo.svg" companyLogoAlt="Logo de Apple" targetURL="https://www.clubic.com/tutoriels/article-889913-1-comment-ajouter-raccourci-web-page-accueil-iphone.html " />
                    <StoreCallToAction companyLogoSRC="/images/google-logo.svg" companyLogoAlt="Logo de Google" targetURL="https://www.nextpit.fr/comment-creer-applications-web-raccourcis-android" />
                    <StoreCallToAction companyLogoSRC="/images/microsoft-logo.svg" companyLogoAlt="Logo de Microsoft" targetURL="https://www.01net.com/astuces/windows-10-comment-transformer-vos-sites-web-preferes-en-applications-natives-1968951.html" />
                </div>
                <div id="diverse-links">
                    <Link to="#patch-notes">Patch Notes</Link> • <Link to="#policy">Mentions légales</Link> • <Link to="/feedback">Faire un retour</Link> • <a href="https://github.com/Magic-Fishes/Ecole-Directe-Plus" target="_blank">Github</a>
                </div>
            </div>
        </div>
    )
}